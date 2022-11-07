<template>
  <div>
    <span
      @click="updateTask(task)"
      v-if="task.completed"
      style="font-size: 23px"
      class="bi bi-check-all"
    ></span>
    <span
      @click="updateTask(task)"
      v-else
      style="font-size: 23px"
      class="bi bi-check"
    ></span>
    <span
      v-if="loading"
      class="spinner spinner-border spinner-border-sm"
    ></span>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
const store = useStore();
defineProps(["task"]);
const loading = ref(false);
async function updateTask(task) {
  loading.value = true;
  await store.dispatch("task/updateTask", task);
  loading.value = false;
}
</script>

<style>
</style>