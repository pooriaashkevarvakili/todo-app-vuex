<template>
  <div>
    <span @click="deleteTask" class="bi ms-3 bi-trash-fill"></span>

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
const props = defineProps(["id"]);
const loading = ref(false);
async function deleteTask() {
  loading.value = true;
  await store.dispatch("task/deleteTask", props.id);
  loading.value = false;
}
</script>
  
  <style>
</style>