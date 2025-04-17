<script setup lang="ts">
import { defineProps, computed } from "vue";
import DOMPurify from 'dompurify';
import type { WordPressPostData } from '../types/wordpressTypes';

const props = defineProps<{
  post: WordPressPostData 
}>();


// const featuredMediaUrl = computed(() => {
  
//   return props.post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
// });


const sanitizedExcerpt = computed(() => {
  return props.post.excerpt?.rendered
    ? DOMPurify.sanitize(props.post.excerpt.rendered)
    : '';
});
</script>

<template>
  <RouterLink :to="'/post/' + post.slug" class="block group">
    <h3 class="text-xl font-semibold mb-2 text-gray-800 group-hover:text-purple-700 transition-colors duration-200">{{ post.title.rendered }}</h3>
    <div v-if="sanitizedExcerpt" class="text-sm text-gray-600 prose prose-sm max-w-none mb-3" v-html="sanitizedExcerpt"></div>
    <span class="inline-block text-sm font-medium text-purple-600 group-hover:text-white group-hover:bg-purple-600 border border-purple-600 rounded px-3 py-1 transition-colors duration-200">
      Read More &rarr;
    </span>
  </RouterLink>
</template>

<style scoped>

</style>
