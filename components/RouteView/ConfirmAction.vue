<template>
  <div>
    <Snackbar :text="text" :snackbar="snackbar" :color="color" />
    <v-dialog v-model="dialog" width="500">
      <template #activator="{ on: dialog }">
        <v-tooltip top>
          <template #activator="{ on: tooltip }">
            <p color="blue" dark v-on="{ ...tooltip, ...dialog }">Forgot Password?</p>
          </template>
          <span>Email password reset</span>
        </v-tooltip>
      </template>

      <!-- Modal Content -->
      <v-card>
        <v-card-title class="headline blue" primary-title>Reset Password</v-card-title>
        <div class="less-wide">
          <v-form>
            <v-text-field class="mt-3" v-model="email" label="Email" required></v-text-field>
          </v-form>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="resetPass">Reset Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase";
import Snackbar from "../Snackbar";
export default {
  name: "ConfirmAction",

  data() {
    return {
      //Modal toggle controller vuetify
      dialog: false,
      //For adding route
      email: null,
      //Props for snackbar
      text: "",
      snackbar: false,
      color: ""
    };
  },
  components: {
    Snackbar
  },
  methods: {
    resetPass() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.snackbar = true;
          this.text = "Email Sent";
          this.color = "success";
          setTimeout(() => {
            this.snackbar = false;
          }, 3000);
        })
        .catch(err => {
          console.log(err.message);
          this.snackbar = true;
          this.text = err.message;
          this.color = "error";
          setTimeout(() => {
            this.snackbar = false;
          }, 3000);
        });
    }
  }
};
</script>


<style scoped>
p {
  text-align: center;
  cursor: pointer;
}
.less-wide {
  width: 80%;
  margin: 0 auto;
}
</style>