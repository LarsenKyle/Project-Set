<template>
  <div class="flex">
    <h3 @click="changePassword">Change Password</h3>
    <v-btn>Email Link</v-btn>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "EmailReset",
  data() {
    return {};
  },
  methods: {
    changePassword() {
      const userMail = this.$store.state.email;
      firebase
        .auth()
        .sendPasswordResetEmail(userMail)
        .then(() => {
          console.log("Email Sent");
        });
    }
  }
};
</script>

<style lang="scss">
</style>