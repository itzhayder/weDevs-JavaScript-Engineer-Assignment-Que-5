import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      { id: "1", content: "finish weDevs assignment", completed: false, edit: false},
      { id: "2", content: "learn new tech", completed: true, edit: false},
      { id: "3", content: "war attack clash of clans", completed: false, edit: false},
      { id: "4", content: "build a personal project", completed: false, edit: false}
    ]
  },

  getters: {
    getTodos: state => {
      return state.todos;
    },
    getTotal: state => {
      return state.todos.filter(todo => !todo.completed).length;
    }
  },

  mutations: {
    addTodo: (state, payload) => {
      state.todos.push({
        id: "_" + Math.random().toString(36).substr(2, 9),
        content: payload,
        completed: false,
      });
    },
    clearCompleted: (state, payload) => {
      state.todos = payload.filter(todo => !todo.completed);
    },
    editTodo: (state, payload) => {
      state.todos[payload].edit = true;
    },
    updatedTodo: (state, [todo, index]) => {
      todo.edit = false;
      state.todos.splice(index, 1, todo);
    }
  },

  actions: {
    addTodo: (context, payload) => {
      context.commit("addTodo", payload);
    },
    clearCompleted: (context, payload) => {
      context.commit("clearCompleted", payload);
    },
    editTodo: (context, payload) => {
      context.commit("editTodo", payload);
    },
    updatedTodo: (context, payload) => {
      context.commit("updatedTodo", payload);
    }
  }
})
