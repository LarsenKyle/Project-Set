<template>
  <div>
    <Snackbar :text="text" :snackbar="snackbar" :color="color" />
    <div class="delete-grid">
      <h3
        @click="() => {this.addSectionHandler = !this.addSectionHandler}"
        align="left"
        :class="{mkPrim:addSectionHandler}"
        class="pt-4 top"
      >Delete Section</h3>
      <v-icon
        @click="() => {this.addSectionHandler = !this.addSectionHandler}"
        class="mt-4 icon"
        :class="{mkPrim:addSectionHandler}"
        large
      >mdi-arrow-down-bold-hexagon-outline</v-icon>

      <v-select
        v-if="addSectionHandler && items"
        class="type"
        :items="items"
        v-model="section"
        label="Section Type"
      ></v-select>
      <v-btn
        v-if="addSectionHandler && items"
        @click="deleteSection"
        class="button mt-3"
      >Delete Section</v-btn>
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
      sections: [],
      section: null,
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
    deleteSection() {
      let deleteSection;
      let deleteItem;
      this.sections.forEach(sect => {
        if (sect.name === this.section) {
          deleteSection = sect.id;
          deleteItem = sect.name;
        }
      });
      const user = this.$store.state.auth;
      fireDb
        .collection("users")
        .doc(user)
        .collection("sections")
        .doc(deleteSection)
        .delete();
      this.section = null;
      this.items = this.items.filter(item => {
        return item != deleteItem;
      });
    }
  },
  mounted() {
    //If store is not yet populated, subs and populates select input
    if (this.$store.state.sections.sections.length === 0) {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type == "sections/pushSection") {
          this.sections.push(mutation.payload);
          this.items.push(mutation.payload.name);
        }
      });
    }
    if (this.items.length === 0) {
      //
      //sub to store to allow new sections to populate select input
      //
      this.$store.subscribe((mutation, state) => {
        if (mutation.type == "sections/pushSection") {
          this.sections.push(mutation.payload);
          this.items.push(mutation.payload.name);
        }
      });
      //
      // Grabs sections from store and populates select input
      //
      this.$store.state.sections.sections.forEach(section => {
        this.sections.push(section);
        this.items.push(section.name);
      });
    }
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