import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Todo from "../views/Todo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/todo",
    name: "Todo",
    component: Todo,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.state.isLoggedIn;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (!loggedIn && requiresAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
