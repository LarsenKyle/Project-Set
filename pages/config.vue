<template>
  <v-layout id="config" justify-center align-center>
    <AddSection />
    <DeleteSection />
  </v-layout>
</template>

<script>
import AddSection from "../components/GymConfig/AddSection";
import DeleteSection from "../components/GymConfig/DeleteSection";
export default {
  components: {
    AddSection,
    DeleteSection
  }
};
</script>

<style lang="scss" >
#config {
  flex-direction: column;
}
</style>
