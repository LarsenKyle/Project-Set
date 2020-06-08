import firebase from "firebase";
export const state = () => ({
  auth: false,
  email: null
});
export const actions = {
  async getUser({ commit }) {
    let promise = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user);
        reject("Ohh no");
      });
    });
    //Use promise to get user with onAuthStateChanged listener
    let user = await promise;

    commit("addUser", user.uid);
    commit("addEmail", user.email);
  }
};
export const mutations = {
  addUser(state, payload) {
    state.auth = payload;
  },
  addEmail(state, payload) {
    state.email = payload;
  }
};
