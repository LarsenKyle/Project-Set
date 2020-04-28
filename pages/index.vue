<template>
  <v-layout column justify-center align-center>
    <Section />
  </v-layout>
</template>

<script>
import Section from "../components/Section";

export default {
  data() {
    return {
      title: "Project"
    };
  },
  components: {
    Section
  }
};
</script>
