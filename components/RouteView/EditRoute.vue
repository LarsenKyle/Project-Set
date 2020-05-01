<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="500">
      <!-- Modal Content -->
      <v-card>
        <v-card-title class="headline blue" primary-title>Edit Route</v-card-title>
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
          <v-btn @click="emitDialog" color="primary">Save Changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["route", "dialog"],
  //Watcher for populating the EditRoute modal
  watch: {
    dialog: function(val) {
      const { name, grade, color, setter } = this.route;
      this.name = name;
      this.grade = grade;
      this.color = color;
      this.setter = setter;
    }
  },
  data() {
    return {
      name: "",
      grade: "",
      color: "",
      setter: ""
    };
  },
  methods: {
    emitDialog() {
      //Passing back prop to avoid vue warn
      this.$emit("clicked", !this.dialog);
    }
  }
};
</script>

<style>
</style>