<template>
  <div class="table">
    <v-data-table
      id="route-table"
      v-model="selected"
      :headers="headers"
      :items="routes"
      @click:row="editRoute"
      :single-select="singleSelect"
      item-key="id"
      show-select
      hide-default-footer
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "Route",
      //Vuetify Table Config
      /////////////////////
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: "Route Name",
          align: "start",
          sortable: true,
          value: "name"
        },
        { text: "Grade", value: "grade" },
        { text: "Color", value: "color" },
        { text: "Setter", value: "setter" }
      ]
    };
  },
  watch: {
    selected: {
      handler: function(val, oldVal) {
        this.updateSelected();
      }
    }
  },
  methods: {
    updateSelected() {
      const selectedId = [];
      this.selected.forEach(route => {
        selectedId.push(route.id);
      });

      this.$store.commit("sections/add", selectedId);
    },
    editRoute(value) {
      console.log(value);
    }
  },
  props: ["routes"]
};
</script>

<style lang="scss" >
@import ".././assets/variables.scss";
#route-table thead th {
  color: $primary;
  font-size: 1rem;
}
</style>