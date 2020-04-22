<template>
  <v-data-table
    id="route-table"
    v-model="selected"
    :headers="headers"
    :items="routes"
    :single-select="singleSelect"
    item-key="id"
    show-select
    hide-default-footer
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{props.item.name}}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
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
  name: "Route",
  props: ["routes"]
};
</script>

<style>
#route-table thead th {
  color: #b9d2d2;
  font-size: 1rem;
}
</style>