<template>
  <nav>
    <div class="logo-container">
      <img src="../assets/reminders.svg" alt="logo" />
      <div class="links">
        <ul class="mylinks">
          <li v-if="!this.$store.state.isLoggedIn">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="!this.$store.state.isLoggedIn">
            <router-link to="/login">Login</router-link>
          </li>
        </ul>
      </div>
      <div class="account">
        <div v-if="this.$store.state.isLoggedIn">
          <span class="email">{{ this.$store.state.currentUser }}</span>
        </div>
        <div v-if="this.$store.state.isLoggedIn">
          <button @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$store.state.isLoggedIn = false;
          this.$router.push("login");
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  created() {
    if (JSON.parse(localStorage.getItem("loggedUser"))) {
      this.$store.state.isLoggedIn = true;
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  .logo-container {
    text-align: center;
    margin-top: 1em;
    margin-bottom: 2rem;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: center;
    img {
      width: 90px;
      height: 90px;
      margin-bottom: 0.7rem;
    }
    .links {
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        padding-top: 1.5rem;
        margin-left: 1.2rem;
        overflow: hidden;
        position: absolute;
        float: right;
        li {
          float: left;
          margin: 0.5rem 1.6rem 0 0;
          a {
            display: block;
            color: grey;
            text-align: center;
            text-decoration: none;
          }
          a:hover {
            background-color: #111111;
            color: orangered;
          }
        }
      }
    }
    .account {
      margin-top: 1.1rem;
      span {
        margin: 1rem;
        color: grey;
      }
      button {
        margin: 1rem;
        font-size: 15px;
        padding: 0.5em;
        border: none;
        outline: none;
        background: none;
        color: orangered;
        box-shadow: 0 0 10px black;
        cursor: pointer;
      }
    }
  }
}
</style>
