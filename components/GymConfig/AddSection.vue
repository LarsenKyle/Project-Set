<template>
  <div>
    <Snackbar :text="text" :snackbar="snackbar" :color="color" />
    <div class="grid">
      <h3
        @click="() => {this.addSectionHandler = !this.addSectionHandler}"
        align="left"
        class="pt-4"
      >Add New Section</h3>
      <v-icon
        @click="() => {this.addSectionHandler = !this.addSectionHandler}"
        class="mt-4"
        large
      >mdi-arrow-down-bold-hexagon-outline</v-icon>

      <v-text-field v-if="addSectionHandler" class="name" v-model="name" label="Name" required></v-text-field>

      <v-select
        v-if="addSectionHandler"
        class="type"
        :items="items"
        v-model="type"
        label="Section Type"
      ></v-select>
      <v-btn v-if="addSectionHandler" @click="addSection" class="button mt-3">Add Section</v-btn>
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
      items: ["Boulder", "Roped"],
      name: null,
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
    addSection() {
      if (this.name === null || this.type === null) {
        this.text = "Please fill out all fields";
        this.color = "error";
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, 3000);
      } else {
        const section = {
          name: this.name,
          type: this.type
        };
        const user = this.$store.state.auth;
        fireDb
          .collection("users")
          .doc(user)
          .collection("sections")
          .add(section);
        this.name = "";
        this.type = "";
        this.text = "New Section Added!";
        this.color = "success";
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, 3000);
      }
    }
  }
};
</script>

<style lang="scss" >
h3 {
  font-size: 1.6rem;
}

.v-icon::after {
  background-color: none;
}
.grid {
  display: grid;
  grid-template-areas:
    "top top top top"
    "name name type type"
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
</style>