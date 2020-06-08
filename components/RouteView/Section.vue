<template>
  <div class="Section">
    <v-expansion-panels>
      <v-expansion-panel v-for="section in sections" :key="section.id">
        <v-expansion-panel-header>{{ section.name }} {{section.type}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="text-right">
            <DeleteRoute />
            <AddRoute :section="section" />
          </div>
          <RouteTable :section="section.name" />
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
    },
    routes() {
      return this.$store.state.sections.routes;
    }
  }
};
</script>

<style>
.v-expansion-panel-header {
  font-size: 1.1rem;
}
</style>
