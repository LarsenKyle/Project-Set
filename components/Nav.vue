<template>
  <v-bottom-navigation>
    <v-btn class="ml-auto" @click="navTime('config')" value="recent">
      <span>Gym Config</span>
      <v-icon v-if="!loading">mdi-cog</v-icon>
      <v-skeleton-loader v-if="loading" class="mx-auto" max-width="40" type="button"></v-skeleton-loader>
    </v-btn>

    <v-btn @click="navTime('')" value="favorites">
      <span>Routes</span>
      <v-icon v-if="!loading">mdi-poll</v-icon>
      <v-skeleton-loader v-if="loading" class="mx-auto" max-width="40" type="button"></v-skeleton-loader>
    </v-btn>

    <v-btn @click="navTime('account')" value="nearby">
      <span>Account</span>
      <v-icon v-if="!loading">mdi-account</v-icon>
      <v-skeleton-loader v-if="loading" class="mx-auto" max-width="40" type="button"></v-skeleton-loader>
    </v-btn>
    <v-btn @click="logout" color="primary" class="ml-auto">Log Out</v-btn>
  </v-bottom-navigation>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      loading: true
    };
  },
  methods: {
    navTime(path) {
      this.$router.push({
        path: `/${path}`
      });
    },
    async logout() {
      await firebase.auth().signOut();
      this.$router.push({ path: "login" });
    }
  },
  async mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }
};
</script>

<style></style>
