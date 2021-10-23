<template>
  <section class="main">
    <h1>Todo App</h1>
    <div class="swagger">
        <a href="/api-docs"><button>Swagger</button></a>
      </div>
    <form class="mb-3">
      <label>New ToDo</label>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        type="text"
        v-model="newTask"
        @keyup.enter="addTask(newTask)"
      />
      <button type="button" @click="addTask(newTask)">Add ToDo</button>
    </form>

    <div class="todo-list" v-if="todoList.length > 0" v-cloak>
      <h2>ToDo List</h2>
      <ul class="list-group">
        <li class="list-elem" v-for="todo in filteredList" :key="todo._id">
            <label @click="editTask(todo._id, todo.todo, !todo.completed)" :class="{ 'completed': todo.completed }" >
              {{ todo.todo }}
            </label>

            <button type="button" @click="deleteTask(todo._id, $event.target)">
              <span aria-hidden="true">Delete</span>
            </button>
        </li>
      </ul>
      <div class="footer-menu">
      <button @click="visibility='all'" class="btn-footer">Show All</button>
      <button @click="visibility='active'" class="btn-footer">Show Active</button>
      <button @click="visibility='completed'" class="btn-footer">Show Completed</button>
      </div>
    </div>
    <p v-else class="footer-text">Empty list.</p>
  </section>
</template>

<script>
import ApiClient from "../ApiClient";

const filters = {
  all: function(todos) {
    return todos;
  },
  active: function(todos) {
    return todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  completed: function(todos) {
    return todos.filter(function(todo) {
      return todo.completed;
    });
  }
};

export default {
  name: "Todo",
  data() {
    return {
      todoList: [],
      newTask: "",
      visibility: "all",
      beforeEditCache: ""
    };
  },
  computed: {
    filteredList: function() {
      return filters[this.visibility](this.todoList);
    }
  },
  methods: {
    // Retrieve tasks from API and save in the todoList array
    retrieveTasks: async function() {
      await ApiClient.retrieveTasks()
        .then(todos => {
          this.todoList = todos;
        })
        .catch(err => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Add task to todolist
    addTask: async function(task) {
      if (!/\S/.test(task)) return;
      await ApiClient.addTask(task)
        .then(() => {
          this.newTask = "";
          this.retrieveTasks(); // Reload the array
        })
        .catch(err => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Delete task from todolist
    deleteTask: async function(id, el=null) {
      if(el) el.parentElement.disabled = true; 
      await ApiClient.deleteTask(id)
        .then(() => {
          this.retrieveTasks(); 
        })
        .catch(err => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Edit task in todolist
    editTask: async function(id, task, completed ) {
      this.beforeEditCache = task; 
      if (!/\S/.test(task)) return; 
      await ApiClient.editTask(id, task, completed)
        .then(() => {
          this.retrieveTasks(); 
        })
        .catch(err => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Revert the task back to the state in the cache
    cancelEdit: async function(id, completed) {
      if (!/\S/.test(this.beforeEditCache)) return; 
      await ApiClient.editTask(id, this.beforeEditCache, completed, false)
        .then(() => {
          this.retrieveTasks();
        })
        .catch(err => this.$toastr.e(`An error occurred: ${err}`));
    },
    formatDate: function(dateString) {
      let date = new Date(dateString);
      return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
    }
  },
  // Retrieve tasks when the page is loaded
  async beforeMount() {
    await this.retrieveTasks();
  },
  // Custom directive to focus on input field when the DOM is updated
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
};
</script>
