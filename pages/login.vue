<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <Snackbar :text="text" :snackbar="snackbar" :color="color" />
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Sign In</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="email"
                  type="email"
                  :rules="emailRules"
                />

                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  :rules="passwordRules"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="loginUser" color="primary">Sign In</v-btn>
            </v-card-actions>
          </v-card>
          <ConfirmAction />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import firebase from "firebase";
import Snackbar from "../components/Snackbar";
import ConfirmAction from "../components/RouteView/ConfirmAction";
export default {
  components: {
    Snackbar,
    ConfirmAction
  },
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      //Props for snackbar
      text: "",
      snackbar: false,
      color: ""
    };
  },
  methods: {
    async loginUser() {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        await this.$store.dispatch("getUser");
        await this.$store.dispatch("sections/getRoutes");
        this.$router.push({ path: "/" });
      } catch (err) {
        (this.text = err.message),
          (this.snackbar = true),
          (this.color = "error");
        setTimeout(() => {
          this.snackbar = false;
        }, 3000);
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
