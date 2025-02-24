<template>
  <Loading v-if="isLoading" :active="isLoading" :is-full-page="true" />
  <div v-else class="mx-auto mt-10 max-w-7xl min-h-screen px-2 bg-white text-black">
    <Header v-once />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 400);
});
</script>

<style></style>
