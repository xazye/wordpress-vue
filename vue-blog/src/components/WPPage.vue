<script setup lang="ts">
import { defineProps, computed } from "vue";
import DOMPurify from 'dompurify';
// Import the interface for type safety (optional but recommended)
import type { WPPageData } from '../composables/useWordPressApi';

const props = defineProps<{
  page: WPPageData // Use the interface for the page prop
}>();

// Computed property to safely get the featured media URL from embedded data
const featuredMediaUrl = computed(() => {
  // Access the embedded data, checking each level for existence
  return props.page._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
});

// Computed property for the sanitized excerpt
const sanitizedExcerpt = computed(() => {
  return props.page.excerpt?.rendered
    ? DOMPurify.sanitize(props.page.excerpt.rendered)
    : '';
});
</script>

<template>
  <div>
    <RouterLink :to="'/pages/' + page.slug" class="block hover:bg-gray-50 p-2">
      <h3 class="text-lg font-semibold mb-1">{{ page.title.rendered }}</h3>

      <img
        v-if="featuredMediaUrl"
        :src="featuredMediaUrl"
        :alt="page.title.rendered"
        class="mb-2 max-w-xs h-auto"
      />
      <div v-if="sanitizedExcerpt" class="text-sm text-gray-700 prose-sm" v-html="sanitizedExcerpt"></div>

    </RouterLink>
  </div>
</template>

<style scoped>

</style>
