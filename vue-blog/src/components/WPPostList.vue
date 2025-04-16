<script setup lang="ts">
import WPPost from './WPPost.vue';
import { onMounted } from 'vue';
import { useGetWordrpessPostsApi } from '../composables/getWordpressPosts'; 


const { posts, loadingPosts, errorPosts, fetchPosts } = useGetWordrpessPostsApi();


onMounted(()=>{
  fetchPosts()
});
</script>

<template>
  <!-- Loading State -->
  <div v-if="loadingPosts" class="text-center py-4"> 
    Loading pages...
  </div>

  <!-- Error State -->
  <div v-else-if="errorPosts" class="text-center py-4 text-red-600"> 
    Error loading pages: {{ errorPosts.message }}
  </div>

  <!-- Data Loaded State -->
  <div v-else-if="posts" class="[&>*:nth-child(odd)]:bg-blue-100"> 
    <div v-for="post in posts" :key="post.id" class="border border-gray-300 my-2 p-2"> 
      <WPPost :post="post"/>
    </div>
  </div>

  <!-- No Posts Found State -->
  <div v-else class="text-center py-4 text-gray-500">
    No Posts found.
  </div>
</template>

<style scoped>

</style>
