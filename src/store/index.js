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
    isTodosLoading: true,
    isLoggingIn: true,
    currentUser: localStorage.getItem("currentUser"),
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
        this.state.isLoggingIn = false;
        this.state.currentUser = payload.email;
        localStorage.setItem("currentUser", payload.email);
        commit("login", response.user);
      } catch (err) {
        this.state.isLoggingIn = true;        
        throw err;
      }
    },
    async logout(context) {
      await auth.signOut();
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("currentUser");
      this.state.isLoggingIn = true;
      this.state.currentUser = "";
      context.commit("logout");
    },
    async register({ commit }, payload) {
      this.state.isLoggingIn = false;
      let response = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
      this.state.currentUser = payload.email;
      localStorage.setItem("currentUser", payload.email);
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
      context.state.loading = true;
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
          context.state.isTodosLoading = false;
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
