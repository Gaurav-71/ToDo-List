<template>
  <div class="todo">
    <div class="todo-list">
      <form @submit.prevent="addTodo">
        <input type="text" placeholder="+ Enter a new task" v-model="newTodo" />
      </form>
      <div class="loading-icon" v-if="$store.state.loading">
        <img src="../assets/loading.svg" alt="loading" style="width: 80px" />
        <p>Fetching your data</p>
      </div>
      <ul>
        <li v-for="(todo,index) in todos" :key="index">
          {{ todo.Task }}
          <button @click="deleteTodo(index,todo.id)">
            <img src="../assets/delete.svg" alt="todo-logo" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.todo {
  border-radius: 1em;
  background-color: none;
  .todo-list {
    form {
      width: 100%;
      input {
        width: calc(100% - 40px);
        border-radius: 1em;
        background-color: rgb(15, 14, 14);
        padding: 20px;
        font-size: 1.3em;
        border: 2px solid black;
        border-radius: 1em;
        box-shadow: 0 0 10px black;
        color: grey;
        outline: none;
      }
    }
    .loading-icon {
      margin-top: 1em;
      text-align: center;
      p {
        margin-top: 0;
        color: rgb(211, 50, 50);
        font-size: 1.5rem;
      }
    }
    ul {
      margin: 0;
      padding: 0;
      margin-top: 30px;
      list-style-type: none;
      color: orangered;
      border: 2px solid black;
      border-radius: 1em;
      box-shadow: 0 0 10px black;
      li {
        text-align: left;
        padding: 20px;
        font-size: 1.3em;
        border-bottom: 1px solid black;
        button {
          float: right;
          cursor: pointer;
          background: none;
          border: none;
          outline: none;
          img {
            width: 27px;
            outline: none;
          }
        }
      }
    }
  }
}
</style>
