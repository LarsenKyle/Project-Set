<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <Snackbar :text="text" :snackbar="snackbar" :color="color" />
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Sign Up</v-toolbar-title>
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
                <v-text-field
                  v-model="confirm"
                  id="confirm"
                  label="Confirm Password"
                  name="confirm"
                  type="password"
                  :rules="confirmRules"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="createUser" color="primary">Create Account</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import firebase from "firebase";
import Snackbar from "../components/Snackbar";
export default {
  components: {
    Snackbar
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
      confirm: "",
      confirmRules: [
        v => !!v || "You must confirm your password",
        v => v === this.password || "You must confirm your password"
      ],
      text: "",
      snackbar: false,
      color: ""
    };
  },
  methods: {
    async createUser() {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        const userId = await firebase.auth().currentUser.uid;
        await firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .set({ userId });
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

<style lang="scss"></style>
