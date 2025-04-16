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
  <div>
    <RouterLink :to="'/post/' + post.slug" class="block hover:bg-gray-50 p-2">
      <h3 class="text-lg font-semibold mb-1">{{ post.title.rendered }}</h3>

      <!-- <img
        v-if="featuredMediaUrl"
        :src="featuredMediaUrl"
        :alt="page.title.rendered"
        class="mb-2 max-w-xs h-auto"
      /> -->
      <div v-if="sanitizedExcerpt" class="text-sm text-gray-700 prose-sm" v-html="sanitizedExcerpt"></div>

    </RouterLink>
  </div>
</template>

<style scoped>

</style>
