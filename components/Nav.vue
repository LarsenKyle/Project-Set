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
    <v-btn v-if="$store.state.auth" @click="logout" color="primary" class="ml-auto">Log Out</v-btn>
    <v-btn
      v-if="!$store.state.auth"
      @click="navTime('login')"
      color="primary"
      class="ml-auto"
    >Log In</v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import { fireDb } from "../plugins/firebase";
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
      this.$store.commit("addUser", null);
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("getUser");
    } catch (err) {
      console.log(err);
      if (!this.$store.state.auth) {
        this.$router.push({ path: "login" });
      }
    }

    if (this.$store.state.auth) {
      await this.$store.dispatch("sections/getRoutes");
    }

    setTimeout(() => {
      this.loading = false;
    }, 300);
  }
};
</script>

<style></style>
