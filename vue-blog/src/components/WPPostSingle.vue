<script setup lang="ts">
import { defineProps, watchEffect, computed } from "vue";
import DOMPurify from 'dompurify';
import {initSlider} from '@/src/utils/gallerySlider.js';
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
    initSlider()
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
  <div class="bg-white shadow rounded-lg p-6 md:p-8 lg:p-10">
    <div v-if="loadingPost" class="text-center py-10 text-gray-500">
      <p>Loading post...</p>
    </div>

    <div v-else-if="errorPost" class="text-center py-10 text-red-600 bg-red-100 border border-red-400 rounded p-4">
      <p class="font-semibold">Error loading post:</p>
      <p>{{ errorPost.message }}</p>
    </div>

    <article v-else-if="post">
      <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-4">{{ post.title.rendered }}</h1>

      <div v-if="sanitizedExcerpt" class="prose prose-lg max-w-none mb-6 text-gray-600 italic" v-html="sanitizedExcerpt"></div>
      <div
        v-if="sanitizedContent"
        class="prose prose-lg max-w-none prose-headings:text-gray-700 prose-a:text-purple-600 hover:prose-a:text-purple-800 prose-strong:text-gray-700"
        v-html="sanitizedContent"
      ></div>
    </article>

    <div v-else-if="!loadingPost" class="text-center py-10 text-gray-500">
      <p>Post not found.</p>
    </div>
  </div>
</template>

<style scoped>

</style>
