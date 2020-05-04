import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/main";
import { db } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("loggedUser")),
    isLoggedIn: false,
    userTodos: [],
    postSubscription: null,
  },
  mutations: {
    login: (state, user) => {
      state.user = user;
      state.isLoggedIn = true;
      localStorage.setItem("loggedUser", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = "";
      state.isLoggedIn = false;
      state.userTodos = [];
    },
    register: (state, user) => {
      state.user = user;
      state.isLoggedIn = true;
      localStorage.setItem("loggedUser", JSON.stringify(user));
    },
    loadTodos: (state, todos) => {
      state.userTodos = todos;
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        let response = await auth.signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
        commit("login", response.user);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async logout(context) {
      await auth.signOut();
      localStorage.removeItem("loggedUser");
      context.commit("logout");
    },
    async register({ commit }, payload) {
      let response = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
      commit("register", response.user);
    },
    async addTodo({ commit }, payload) {
      try {
        console.log(commit);
        await db.collection("Todos").add(payload);
      } catch (err) {
        alert(err);
      }
    },
    async loadTodos(context) {
      let postSubscription = db
        .collection("Todos")
        .where("activeUser", "==", context.state.user.uid)
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          let userTodos = [];
          snapshot.forEach((doc) => {
            let data = { id: doc.id, Task: doc.data().Task };
            userTodos.push(data);
          });
          context.commit("loadTodos", userTodos);
        });
      return postSubscription;
    },
    async deleteTodo({ commit }, id) {
      await db
        .collection("Todos")
        .doc(id)
        .delete();
      console.log(commit);
    },
  },
  getters: {
    getList: (store) => {
      return store.userTodos;
    },
  },
  modules: {},
});
