<template>
  <div class="Section">
    <v-expansion-panels>
      <v-expansion-panel v-for="section in sections" :key="section.id">
        <v-expansion-panel-header>{{section.name}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <Route :routes="section.routes" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import Route from "./Route";
export default {
  name: "Section",
  data() {
    return {
      sortedRoutes: [],
      sections: [
        {
          id: 1,
          name: "Powers Wall",
          type: "roped",
          routes: [
            {
              name: "Ringus Bingus",
              grade: "5.10a",
              color: "Pink",
              setter: "Sif",
              id: 1
            },
            {
              name: "Stabby Shabby",
              grade: "5.10b",
              color: "Orange",
              setter: "Sif",
              id: 2
            },
            {
              name: "Stabby Acres",
              grade: "5.12b",
              color: "Pink",
              setter: "Sif",
              id: 3
            }
          ]
        },
        {
          id: 2,
          name: "Valhala",
          type: "roped",
          routes: [
            {
              name: "Ringus Bingus",
              grade: "5.10a",
              color: "Pink",
              setter: "Sif",
              id: 1
            },
            {
              name: "Stabby Acres",
              grade: "5.10b",
              color: "Orange",
              setter: "Sif",
              id: 2
            },
            {
              name: "Shifty Bones",
              grade: "5.12b",
              color: "Pink",
              setter: "Sif",
              id: 3
            }
          ]
        },
        {
          id: 3,
          name: "Circus Wall",
          type: "roped",
          routes: [
            {
              name: "Change Soul",
              grade: "5.11a",
              color: "Blue",
              setter: "Solaire",
              id: 1
            },
            {
              name: "Praise the Sun",
              grade: "5.10b",
              color: "Orange",
              setter: "Solaire",
              id: 2
            },
            {
              name: "Stabby Acres",
              grade: "5.12b",
              color: "Pink",
              setter: "Sif",
              id: 3
            }
          ]
        }
      ]
    };
  },
  components: {
    Route
  }
};
</script>

<style>
</style>