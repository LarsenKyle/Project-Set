<template>
  <div class="Section">
    <v-expansion-panels>
      <v-expansion-panel v-for="section in sections" :key="section.id">
        <v-expansion-panel-header>{{ section.name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="text-right">
            <DeleteRoute />
            <AddRoute :section="section.name" />
          </div>
          <RouteTable :routes="section.routes" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import RouteTable from "./RouteTable";
import DeleteRoute from "./DeleteRoute";
import AddRoute from "./AddRoute";

export default {
  name: "Section",
  components: {
    RouteTable,
    AddRoute,
    DeleteRoute
  },
  data() {
    return {
      addedRoute: null,
      sortedRoutes: []
    };
  },
  computed: {
    sections() {
      return this.$store.state.sections.sections;
    }
  }
};
</script>

<style>
.v-expansion-panel-header {
  font-size: 1.1rem;
}
</style>
