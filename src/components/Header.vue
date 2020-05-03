<template>
  <nav>
    <div class="logo-container">
      <img src="../assets/reminders.svg" alt="logo" />
      <div class="links">
        <ul class="mylinks">
          <li v-if="!isloggedIn">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="!isloggedIn">
            <router-link to="/login">Login</router-link>
          </li>          
        </ul>
      </div>
      <div class="account">
        <div v-if="isloggedIn">
              <span class="email">{{currentUser}}</span>
        </div>
        <div v-if="isloggedIn">
              <button @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Header",
  data() {
    return {
      isloggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isloggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("email");
          this.$router.go({ path: this.$router.path });
        });
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
          margin: .5rem 1.6rem 0 0;          
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
    .account{        
      margin-top: 1.1rem;        
      span{            
        margin: 1rem;            
        color: grey;
      }
      button{
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
