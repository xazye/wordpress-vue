<script setup lang="ts">
import { watchEffect, computed, defineProps } from "vue"; 

import { useGetWordrpessPagesApi } from '../composables/useWordPressApi';
import DOMPurify from 'dompurify'; 


const props = defineProps<{
  page: string 
}>();

const {
  page,
  loadingPage,
  errorPage,
  fetchPageBySlug,
  media,
  loadingMedia,
  errorMedia,
  fetchMediaById
} = useGetWordrpessPagesApi();


watchEffect(async () => {
  const slug = props.page; 
  if (slug) {
    
    page.value = null;
    media.value = null;
    
    await fetchPageBySlug(slug);
  }
});


const sanitizedDescription = computed(() => {
  return media.value?.description?.rendered
    ? DOMPurify.sanitize(media.value.description.rendered)
    : '';
});

const sanitizedExcerpt = computed(() => {
  return page.value?.excerpt?.rendered
    ? DOMPurify.sanitize(page.value.excerpt.rendered)
    : '';
});

const sanitizedContent = computed(() => {
  return page.value?.content?.rendered
    ? DOMPurify.sanitize(page.value.content.rendered)
    : '';
});
</script>

<template>
  <div class="bg-white shadow rounded-lg p-6 md:p-8 lg:p-10">
    <div v-if="loadingPage" class="text-center py-10 text-gray-500">
      <p>Loading page...</p>
    </div>

    <div v-else-if="errorPage" class="text-center py-10 text-red-600 bg-red-100 border border-red-400 rounded p-4">
      <p class="font-semibold">Error loading page:</p>
      <p>{{ errorPage.message }}</p>
    </div>

    <article v-else-if="page">
      <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-4">{{ page.title.rendered }}</h1>

      <div v-if="loadingMedia" class="text-center py-4 text-gray-500">Loading image details...</div>
      <div v-else-if="errorMedia" class="text-center py-4 text-red-500 bg-red-50 border border-red-300 rounded p-3">Error loading image details: {{ errorMedia.message }}</div>
      <div v-else-if="sanitizedDescription" v-html="sanitizedDescription" class="mb-6 prose prose-sm max-w-none text-gray-600 bg-gray-50 p-4 rounded border border-gray-200"></div>

      <div v-if="sanitizedExcerpt" class="prose prose-lg max-w-none mb-6 text-gray-600 italic" v-html="sanitizedExcerpt"></div>
      <div
        v-if="sanitizedContent"
        class="prose prose-lg max-w-none prose-headings:text-gray-700 prose-a:text-purple-600 hover:prose-a:text-purple-800 prose-strong:text-gray-700"
        v-html="sanitizedContent"
      ></div>
    </article>

    <div v-else-if="!loadingPage" class="text-center py-10 text-gray-500">
      <p>Page not found.</p>
    </div>
  </div>
</template>

<style scoped>

</style>
