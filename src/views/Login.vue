<template>
  <div class="login">
    <div class="login-container">
      <div class="login-box">
        <div class="login-icon">
          <img src="../assets/web.svg" alt="signin" />
          <span>Login</span>
        </div>
        <form action="input">
          <div class="id">
            <input type="text" placeholder="Email ID" v-model="email" />
          </div>
          <div class="password">
            <input type="password" placeholder="Password" v-model="password" />
          </div>
          <div class="submit">
            <button @click="login">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.login {
  text-align: center;
  .login-container {
    display: flex;
    justify-content: center;
    .login-box {
      border-radius: 1em;
      width: 22rem;
      height: 20rem;
      box-shadow: 0 0 10px black;
      .login-icon {
        text-align: left;
        img {
          width: 15%;
          margin: 1.2rem 0 1.2em 2.3em;
        }
        span {
          font-size: 30px;
          color: orangered;
          position: absolute;
          float: left;
          margin: 1em 0 0 0.5em;
        }
        border-bottom: 1px solid grey;
        margin-bottom: 2.3em;
      }
      .id,
      .password {
        margin: 1.5em 2em 1em 2em;
        input {
          width: calc(100% - 40px);
          color: papayawhip;
          background: none;
          outline: none;
          padding: 0.7rem;
          border-color: orangered;
        }
      }
      .submit {
        width: 100%;
        margin-top: 1.5em;
        button {
          width: 30%;
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
}
</style>