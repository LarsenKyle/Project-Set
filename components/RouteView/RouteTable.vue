<template>
  <div class="table">
    <EditRoute @clicked="closeDialog" :route="route" :dialog.sync="dialog" />
    <v-data-table
      id="route-table"
      v-model="selected"
      :headers="headers"
      :items="sectionsRoutes"
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
import { fireDb } from "../../plugins/firebase";
import EditRoute from "./EditRoute";
export default {
  name: "Route",
  components: {
    EditRoute
  },
  data() {
    return {
      //Props passed to "EditRoute" component
      dialog: false,
      route: null,
      sectionsRoutes: [],
      routes: [],
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
      //Runs function when route is selected
      handler: function(val, oldVal) {
        this.updateSelected();
      }
    },
    routes: function(val) {
      val.forEach(v => {
        if (!this.sectionsRoutes.includes(v)) {
          if (v.section === this.section) {
            this.sectionsRoutes.push(v);
          }
        }
      });
      this.$store.commit("sections/pushRoute", val);
    }
  },
  async mounted() {
    const user = await this.$store.state.auth;
    await fireDb
      .collection("users")
      .doc(user)
      .collection("routes")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "modified") {
            let newRoute = change.doc.data();
            newRoute.id = change.doc.id;
            if (newRoute.section === this.section) {
              const routeIndex = this.sectionsRoutes.indexOf(this.route);
              this.sectionsRoutes.splice(routeIndex, 1, newRoute);
            }
          }
          if (change.type === "added") {
            let route = change.doc.data();
            route.id = change.doc.id;
            this.routes.push(route);
          }
          if (change.type === "removed") {
            let oldRoute = change.doc.id;
            this.sectionsRoutes = this.sectionsRoutes.filter(route => {
              return route.id !== oldRoute;
            });
          }
        });
      });
  },

  methods: {
    updateSelected() {
      //Updated "Selected" array in store
      //Allows for batch delete
      const selectedId = [];
      this.selected.forEach(route => {
        selectedId.push(route.id);
      });
      this.$store.commit("sections/add", selectedId);
    },
    editRoute(value) {
      //Updates props sent to "EditRoute" component
      //////////////
      this.route = value;
      this.dialog = !this.dialog;
    },
    closeDialog(val) {
      this.dialog = val;
    }
  },
  //Props from "Section" component
  props: ["section"]
};
</script>

<style lang="scss">
@import "../.././assets/variables.scss";
#route-table thead th {
  color: $primary;
  font-size: 1rem;
}
#route-table tbody tr td {
  cursor: pointer;
}
</style>
