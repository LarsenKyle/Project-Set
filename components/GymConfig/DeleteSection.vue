<template>
  <div>
    <Snackbar :text="text" :snackbar="snackbar" :color="color" />
    <div class="delete-grid">
      <h3
        @click="() => {this.addSectionHandler = !this.addSectionHandler}"
        align="left"
        class="pt-4 top"
      >Delete Section</h3>
      <v-icon
        @click="() => {this.addSectionHandler = !this.addSectionHandler}"
        class="mt-4 icon"
        large
      >mdi-arrow-down-bold-hexagon-outline</v-icon>

      <v-select
        v-if="addSectionHandler"
        class="type"
        :items="items"
        v-model="type"
        label="Section Type"
      ></v-select>
      <v-btn v-if="addSectionHandler" @click="deleteSection" class="button mt-3">Add Section</v-btn>
    </div>
  </div>
</template>

<script>
import { fireDb } from "../../plugins/firebase";
import Snackbar from "../Snackbar";
export default {
  name: "AddSection",
  data() {
    return {
      addSectionHandler: false,
      items: [],
      type: null,
      //Props for snackbar
      text: "",
      snackbar: false,
      color: ""
    };
  },
  components: {
    Snackbar
  },
  methods: {
    deleteSection() {}
  },
  mounted() {
    this.$store.state.sections.sections.forEach(section => {
      this.items.push(section.name);
      console.log(section.name);
    });
  }
};
</script>

<style scoped lang="scss" >
h3 {
  font-size: 1.6rem;
}

.v-icon::after {
  background-color: none;
}
.delete-grid {
  display: grid;
  grid-template-areas:
    "top top icon icon"
    "type type type type"
    "button button button button";
  grid-gap: 10px;
}
.top {
  grid-area: top;
}
.name {
  grid-area: name;
}
.type {
  grid-area: type;
}
.button {
  grid-area: button;
}
.icon {
  grid-area: icon;
}
</style>