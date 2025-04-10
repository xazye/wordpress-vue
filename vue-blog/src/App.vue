<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <AppHeader />
    <main class="container mx-auto px-4 py-8 text-black">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>
