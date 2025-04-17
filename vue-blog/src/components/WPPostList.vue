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
  <div class="space-y-8">
    <!-- Loading State -->
    <div v-if="loadingPosts" class="text-center py-10 text-gray-500">
      <p>Loading posts...</p>
      <!-- Optional: Add a spinner here -->
    </div>

    <!-- Error State -->
    <div v-else-if="errorPosts" class="text-center py-10 text-red-600 bg-red-100 border border-red-400 rounded p-4">
      <p class="font-semibold">Error loading posts:</p>
      <p>{{ errorPosts.message }}</p>
    </div>

    <!-- Data Loaded State -->
    <div v-else-if="posts && posts.length > 0" class="space-y-6">
      <div
        v-for="(post, index) in posts"
        :key="post.id"
        :class="['bg-white shadow rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md', index % 2 !== 0 ? 'bg-gray-50' : '']"
      >
        <WPPost :post="post" class="p-6" />
      </div>
    </div>

    <!-- No Posts Found State -->
    <div v-else class="text-center py-10 text-gray-500">
    No Posts found.
    </div>
  </div>
</template>

<style scoped>

</style>
