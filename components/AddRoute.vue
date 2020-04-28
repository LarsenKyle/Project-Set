<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on: dialog }">
      <v-tooltip top>
        <template #activator="{ on: tooltip }">
          <v-icon large color="blue" dark v-on="{ ...tooltip, ...dialog }">mdi-plus</v-icon>
        </template>
        <span>Add New Route</span>
      </v-tooltip>
    </template>

    <!-- Modal Content -->
    <v-card>
      <v-card-title class="headline blue" primary-title>Adds Route</v-card-title>
      <div class="less-wide">
        <v-form>
          <v-text-field class="mt-3" v-model="name" label="Name" required></v-text-field>
          <v-text-field v-model="grade" label="Grade" required></v-text-field>
          <v-text-field v-model="color" label="Color" required></v-text-field>
          <v-text-field class="mb-3" v-model="setter" label="Setter" required></v-text-field>
        </v-form>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="addRoute">Add Route</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddRoute",
  props: ["section"],
  data() {
    return {
      //Component Controller
      dialog: false,
      //For adding route
      name: "",
      grade: "",
      color: "",
      setter: ""
    };
  },
  methods: {
    addRoute() {
      const route = {
        name: this.name,
        grade: this.grade,
        color: this.color,
        setter: this.setter
      };
      const theSection = this.section;
      this.$store.commit("sections/addRoute", { route, theSection });
      this.dialog = false;
      this.name = "";
      this.grade = "";
      this.color = "";
      this.setter = "";
    }
  }
};
</script>


<style>
.less-wide {
  width: 80%;
  margin: 0 auto;
}
</style>