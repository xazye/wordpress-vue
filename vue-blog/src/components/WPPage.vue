<script setup lang="ts">
import { defineProps, computed } from "vue";
import DOMPurify from 'dompurify';
import type { WPPageData } from '../types/wordpressTypes'; // Corrected import path

const props = defineProps<{
  page: WPPageData
}>();


const featuredMediaUrl = computed(() => {
  
  return props.page._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
});


const sanitizedExcerpt = computed(() => {
  return props.page.excerpt?.rendered
    ? DOMPurify.sanitize(props.page.excerpt.rendered)
    : '';
});
</script>

<template>
  <RouterLink :to="'/page/' + page.slug" class="block group p-6 bg-white shadow rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md">
    <h3 class="text-xl font-semibold mb-2 text-gray-800 group-hover:text-purple-700 transition-colors duration-200">{{ page.title.rendered }}</h3>

    <img
      v-if="featuredMediaUrl"
      :src="featuredMediaUrl"
      :alt="page.title.rendered"
      class="mb-3 rounded max-w-full h-auto"
    />
    <div v-if="sanitizedExcerpt" class="text-sm text-gray-600 prose prose-sm max-w-none mb-3" v-html="sanitizedExcerpt"></div>

    <span class="inline-block text-sm font-medium text-purple-600 group-hover:text-white group-hover:bg-purple-600 border border-purple-600 rounded px-3 py-1 transition-colors duration-200">
      View Page &rarr;
    </span>
  </RouterLink>
</template>

<style scoped>

</style>
