<template>
  <v-app>
    <v-main class="main-app">
      <TodoApp />
    </v-main>
  </v-app>
</template>

<script>
import TodoApp from "./components/TodoApp";

export default {
  name: "App",

  components: {
    TodoApp
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>
.main-app {
  background-color: rgb(238, 238, 238);
}
</style>
