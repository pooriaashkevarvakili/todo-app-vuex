<template>
  <div class="row">
    <div class="col-md-2 mb-4">
      <h6>filter tasks</h6>
      <select
        v-model="number"
        @change="filterTask"
        class="form-select form-select-sm"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const number = ref(5);
function filterTask() {
  store.dispatch("task/filterTask", number.value);
}
</script>

<style>
</style>