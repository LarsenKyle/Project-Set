<template>
  <div @click="deleteRoute" class="delete">
    <v-tooltip top>
      <template #activator="{ on: tooltip }">
        <v-icon large color="blue" dark v-on="{...tooltip}">mdi-delete</v-icon>
      </template>
      <span>Delete Selcted Routes</span>
    </v-tooltip>
  </div>
</template>


<script>
import { fireDb } from "../../plugins/firebase";
export default {
  methods: {
    async deleteRoute() {
      const selected = this.$store.state.sections.selected;
      const user = this.$store.state.auth;
      if (selected) {
        await selected.forEach(route => {
          fireDb
            .collection("users")
            .doc(user)
            .collection("routes")
            .doc(route)
            .delete();
        });
      }
    }
  }
};
</script>

<style>
.delete {
  display: inline;
}
</style>