<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100 font-sans"> 
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-12 text-gray-800">
      <RouterView />
    </main>
    <AppFooter /> 
  </div>
</template>

<style scoped>
</style>
