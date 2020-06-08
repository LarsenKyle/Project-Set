import { fireDb } from "../plugins/firebase";
import firebase from "firebase";

export const state = () => ({
  selected: null,
  sections: [],
  routes: [],
  loading: true
});
export const getters = {};
export const actions = {
  async getRoutes({ commit }) {
    let promise = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user);
        reject("Ohh no");
      });
    });
    //Use promise to get user with onAuthStateChanged listener
    let user = await promise;
    //Use promise to retrun an array of sections to use for state mutation

    fireDb
      .collection("users")
      .doc(user.uid)
      .collection("sections")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let section = change.doc.data();
          section.id = change.doc.id;
          commit("pushSection", section);
        });
      });
  }
};
export const mutations = {
  pushRoute(state, payload) {
    if (!state.routes.includes(payload)) {
      state.routes.push(payload);
    }
  },
  pushSection(state, payload) {
    if (!state.sections.includes(payload)) {
      state.sections.push(payload);
    }
  },
  updateRoute(state, payload) {
    const { route, oldIndex } = payload;
    state.routes.splice(oldIndex, route);
  },
  add(state, payload) {
    state.selected = payload;
  },

  deleteRoute(state, payload) {
    console.log(state.routes);
    state.routes = state.routes.filter(route => {
      console.log(route.id);
      console.log(payload);
      return route.id !== payload;
    });
    console.log(state.routes);
  }
};
