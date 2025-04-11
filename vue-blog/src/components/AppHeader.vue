<script setup lang="ts">
import type { Ref } from 'vue'
import type {VueNavLink} from '../composables/useNavigation';
import {ref, onMounted} from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useNavigation } from '../composables/useNavigation';

const navLinks:Ref<VueNavLink[]> = ref([]);
const route = useRoute();
onMounted(async () => {
  navLinks.value = await useNavigation();
});

const linkClasses = "text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium";
const activeLinkClasses = "bg-blue-100 text-blue-700";
</script>
<template>
  
  <header class="bg-white shadow-md">
    
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <p class="text-sm text-gray-600">
        <strong>Current route path:</strong> {{ route.fullPath }}
      </p>
      <nav class="space-x-4">
        <RouterLink v-for="link in navLinks" :key="link.id" :to="link.url" :class="linkClasses"
          :active-class="activeLinkClasses">
          {{ link.title }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
