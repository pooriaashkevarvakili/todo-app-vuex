
<template>
  <div class="row">
    <div class="col-md-12 mb-4">
      <h4>Create tasks</h4>
      <form @submit.prevent="storeTask()" class="row">
        <div class="col-md-6">
          <input v-model="title" class="form-control" type="text" />
          <div class="form-text text-danger">{{ titleError }}</div>
        </div>
        <div class="col-auto">
          <button class="btn btn-dark">
            add

            <span
              v-if="loading"
              class="spinner spinner-border spinner-border-sm"
            ></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const title = ref("");
const loading = ref(false);
const titleError = ref("");

async function storeTask() {
  if (title.value == "") {
    titleError.value = "title is required";
  } else {
    loading.value = true;
    titleError.value = "";
    await store.dispatch("task/storeTask", title.value);
    loading.value = false;
  }
}
</script>
  
  <style>
</style>
