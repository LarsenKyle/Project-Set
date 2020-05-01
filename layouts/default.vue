<template>
  <v-app dark>
    <Nav />
    <nuxt />
  </v-app>
</template>

<script>
import Nav from "../components/Nav";
export default {
  data() {
    return {};
  },
  components: {
    Nav
  }
};
</script>
<style lang="scss">
@import ".././assets/variables.scss";
a {
  text-decoration: none;
  color: $primary;
}
</style>
