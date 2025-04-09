<script setup lang="ts">
import { watchEffect, computed, defineProps } from "vue"; // Import defineProps
// useRoute is no longer needed here if we only use the prop
import { useWordPressApi } from '../composables/useWordPressApi';
import DOMPurify from 'dompurify'; // Import DOMPurify

// Define the 'page' prop passed by the router (due to props: true)
const props = defineProps<{
  page: string // The route parameter name is 'page', which holds the slug string
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
} = useWordPressApi();

// Watch the 'page' prop for changes and fetch data accordingly
watchEffect(async () => {
  const slug = props.page; // Use the prop value
  if (slug) {
    // Reset previous data when slug changes
    page.value = null;
    media.value = null;
    // fetchPageBySlug now handles fetching media internally if featured_media exists
    await fetchPageBySlug(slug);
  }
});

// Create computed properties for sanitized HTML
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
  <div v-if="loadingPage" class="text-center py-4">
    Loading page...
  </div>

  <div v-else-if="errorPage" class="text-center py-4 text-red-600">
    Error loading page: {{ errorPage.message }}
  </div>

  <div v-else-if="page">
    <h1 class="text-2xl font-bold mb-4">{{ page.title.rendered }}</h1>

    <div v-if="loadingMedia">Loading image...</div>
    <div v-else-if="errorMedia" class="text-red-500">Error loading image: {{ errorMedia.message }}</div>
    <div v-else-if="sanitizedDescription" v-html="sanitizedDescription" class="mb-4"></div>
    <div v-if="sanitizedExcerpt" class="prose mb-4" v-html="sanitizedExcerpt"></div>
    <div v-if="sanitizedContent" class="prose" v-html="sanitizedContent"></div>

  </div>
   <div v-else-if="!loadingPage" class="text-center py-4 text-gray-500">
    Page not found.
  </div>
</template>

<style scoped>

</style>
