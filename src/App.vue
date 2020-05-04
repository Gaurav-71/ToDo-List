<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}
body {
  display: flex;
  justify-content: center;
  background-color: rgb(15, 14, 14);
}
#app {
  width: 70%;
}
</style>