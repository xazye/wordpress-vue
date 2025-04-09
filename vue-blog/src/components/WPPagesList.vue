<script setup lang="ts">
import WPPage from './WPPage.vue';
import { onMounted } from 'vue';
import { useWordPressApi } from '../composables/useWordPressApi'; // Import the composable

// Use the correct names for list-related state
const { pages, loadingPages, errorPages, fetchPages } = useWordPressApi();

// Fetch pages when the component is mounted
onMounted(fetchPages);
</script>

<template>
  <!-- Loading State -->
  <div v-if="loadingPages" class="text-center py-4"> 
    Loading pages...
  </div>

  <!-- Error State -->
  <div v-else-if="errorPages" class="text-center py-4 text-red-600"> 
    Error loading pages: {{ errorPages.message }}
  </div>

  <!-- Data Loaded State -->
  <div v-else-if="pages" class="[&>*:nth-child(odd)]:bg-blue-100"> 
    <div v-for="page in pages" :key="page.id" class="border border-gray-300 my-2 p-2"> 
      <WPPage :page="page" />
    </div>
  </div>

  <!-- No Pages Found State (optional but good practice) -->
  <div v-else class="text-center py-4 text-gray-500">
    No pages found.
  </div>
</template>

<style scoped>

</style>
