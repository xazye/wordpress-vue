<script setup lang="ts">
import { defineProps, watchEffect, computed } from "vue";
import DOMPurify from 'dompurify';
import type { WordPressPostData } from '../types/wordpressTypes';
import { useGetWordrpessPostsApi } from "../composables/getWordpressPosts";


const props = defineProps<{
  post: string 
}>();


const {
  post,
  loadingPost,
  errorPost,
  fetchPostBySlug,
} = useGetWordrpessPostsApi();

watchEffect(async () => {
  const slug = props.post; 
  if (slug) {
    post.value = null;
    await fetchPostBySlug(slug);
  }
});



const sanitizedExcerpt = computed(() => {
  return post.value?.excerpt?.rendered
    ? DOMPurify.sanitize(post.value.excerpt.rendered)
    : '';
});

const sanitizedContent = computed(() => {
  return post.value?.content?.rendered
    ? DOMPurify.sanitize(post.value.content.rendered)
    : '';
});
</script>

<template>
  <div v-if="loadingPost" class="text-center py-4">
    Loading page...
  </div>

  <div v-else-if="errorPost" class="text-center py-4 text-red-600">
    Error loading page: {{ errorPost.message }}
  </div>

  <div v-else-if="post">
    <h1 class="text-2xl font-bold mb-4">{{ post.title.rendered }}</h1>

    <div v-if="sanitizedExcerpt" class="prose mb-4" v-html="sanitizedExcerpt"></div>
    <div v-if="sanitizedContent" class="prose" v-html="sanitizedContent"></div>

  </div>
   <div v-else-if="!loadingPost" class="text-center py-4 text-gray-500">
    Page not found.
  </div>
</template>

<style scoped>

</style>
