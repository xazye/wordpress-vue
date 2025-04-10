<script setup lang="ts">
import {onMounted,useFetch } from 'vue'
import { RouterLink, useRoute } from 'vue-router';
import { useNavigation } from '../composables/useNavigation';

let menu = [];
const route = useRoute();
const { navLinks } = useNavigation();

async function fetchmenu () {
  try {
    const data = await fetch('/menu');
    menu = data;
    console.log(data);
  } catch (err) {
    console.error("Failed to fetch menu:", err);
  }
};

onMounted(()=>{
  fetchmenu();
})
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
        <RouterLink to="/" :class="linkClasses" :active-class="activeLinkClasses">
          Home
        </RouterLink>
        <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" :class="linkClasses"
          :active-class="activeLinkClasses">
          {{ link.text }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
