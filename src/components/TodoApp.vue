<template>
  <v-container class="todo-app">
    <h1 class="mb-5">todos</h1>
    <v-row class="row-size">
      <v-col class="todo-main pa-10">
        <v-row>
          <v-text-field placeholder="add todo" v-model="newTodo" @keyup.enter="addTodo"></v-text-field>
        </v-row>

        <v-row v-for="(todo, index) in showTodos" :key="todo.id">
          <v-checkbox v-model="todo.completed" class="pa-0 ma-0"></v-checkbox>
          <span v-on:dblclick="editTodo(index)" v-if="!todo.edit">{{ todo.content }}</span>
          <v-text-field v-if="todo.edit" v-model="todo.content" @keyup.enter="updatedTodo(index)"></v-text-field>
        </v-row>

        <v-row>
          <v-col lg="auto">{{ total }} items left</v-col>

          <v-col lg="2">
            <v-btn small :class="{primary: show == 'all'}" @click="show = 'all'">All</v-btn>
          </v-col>

          <v-col lg="2">
            <v-btn small :class="{primary: show == 'active'}" @click="show = 'active'">Active</v-btn>
          </v-col>

          <v-col lg="2">
            <v-btn
              small
              :class="{primary: show == 'completed'}"
              @click="show = 'completed'"
            >Completed</v-btn>
          </v-col>

          <v-col lg="2" v-if="showClearCompleted">
            <v-btn small class @click="clearCompleted">Clear Completed</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TodoApp",
  data() {
    return {
      newTodo: "",
      show: "all",
      editMode: false,
      editText: ""
    };
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.$store.dispatch("addTodo", this.newTodo.trim());
      this.newTodo = "";
    },
    active() {
      this.showTodos = this.todos.filter(todo => !todo.completed);
      console.log(this.showTodos);
    },
    clearCompleted() {
      this.$store.dispatch("clearCompleted", this.todos);
    },
    editTodo(i) {
      const index = i++;
      this.$store.dispatch("editTodo", index);
    },
    updatedTodo(i) {
      const index = i++;
      const todo = { ...this.todos[index] };
      todo.content = this.todos[index].content;
      this.$store.dispatch("updatedTodo", [todo, index]);
    }
  },

  computed: {
    todos() {
      return [...this.$store.getters.getTodos];
    },
    showTodos() {
      if (this.show == "all") {
        return this.todos;
      } else if (this.show == "active") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.show == "completed") {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    total() {
      return this.$store.getters.getTotal;
    },
    showClearCompleted() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  }
};
</script>

<style scoped>
.row-size {
  max-width: 600px;
}
.todo-main {
  background-color: rgb(255, 255, 255);
}
</style>
