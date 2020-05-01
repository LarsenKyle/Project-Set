<template>
  <div @click="deleteRotue" class="delete">
    <v-tooltip top>
      <template #activator="{ on: tooltip }">
        <v-icon large color="blue" dark v-on="{...tooltip}">mdi-delete</v-icon>
      </template>
      <span>Delete Selcted Routes</span>
    </v-tooltip>
  </div>
</template>


<script>
export default {
  methods: {
    deleteRotue() {
      const selected = this.$store.state.sections.selected;
      this.$store.commit("sections/deleteRoute", selected);
    }
  }
};
</script>

<style>
.delete {
  display: inline;
}
</style>