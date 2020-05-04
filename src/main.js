import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyDaFArWcFxD2SGIx_53_QKUfpyfFc403Xo",
  authDomain: "todo-list-new-20461.firebaseapp.com",
  databaseURL: "https://todo-list-new-20461.firebaseio.com",
  projectId: "todo-list-new-20461",
  storageBucket: "todo-list-new-20461.appspot.com",
  messagingSenderId: "954673670708",
  appId: "1:954673670708:web:ee99e9951f1a0e98f3b861"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
