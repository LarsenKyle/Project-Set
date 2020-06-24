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
          if (change.type === "added") {
            let section = change.doc.data();
            section.id = change.doc.id;
            commit("pushSection", section);
          }
          if (change.type === "removed") {
            let section = change.doc.id;
            commit("deleteSection", section);
          }
        });
      });
    fireDb
      .collection("users")
      .doc(user.uid)
      .collection("routes")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            let route = change.doc.data();
            route.id = change.doc.id;

            commit("pushRoute", route);
          }
          if (change.type === "modified") {
            let route = change.doc.data();
            route.id = change.doc.id;
            commit("modRoute", route);
          }
          if (change.type === "removed") {
            let route = change.doc.data();
            route.id = change.doc.id;

            commit("deleteRoute", route.id);
          }
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
  modRoute(state, payload) {
    let oldRoute;
    state.routes.forEach(route => {
      if (route.id === payload.id) {
        oldRoute = route;
      }
    });
    const routeIndex = state.routes.indexOf(oldRoute);
    state.routes.splice(routeIndex, 1, payload);
  },
  add(state, payload) {
    state.selected = payload;
  },
  deleteSection(state, payload) {
    state.sections = state.sections.filter(section => {
      return section.id !== payload;
    });
  },
  deleteRoute(state, payload) {
    state.routes = state.routes.filter(route => {
      return route.id !== payload;
    });
  }
};
