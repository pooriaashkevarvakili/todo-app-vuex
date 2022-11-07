<template>
  <div>
    <div v-if="loading" class="container mt-5">
      <div class="row justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="container mt-3">
      <div class="row g-3">
        <CreateTask />
        <hr />
        <FilterTask />
        <div v-for="task in tasks" :key="task.id" class="col-md-4">
          <div class="card" :class="{ 'bg-light': task.completed }">
            <div
              class="
                card-body
                align-items-center
                d-flex
                justify-content-between
              "
            >
              <div>
                <del v-if="task.completed">{{ task.title }}</del>
                <div v-else>{{ task.title }}</div>
              </div>
              <div class="d-flex align-items-center">
                <UpdateTask :task="task" />
                <DeleteTask :id="task.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DeleteTask from "./DeleteTask.vue";
import UpdateTask from "./UpdateTask.vue";
import CreateTask from "./CreateTask.vue";
import FilterTask from "./FilterTask.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const loading = ref(false);

const store = useStore();
const tasks = computed(() => store.getters["task/allTasks"]);
async function setTasks() {
  loading.value = true;
  await store.dispatch("task/TodoApp");
  loading.value = false;
}
setTasks();
</script>

<style>
</style>