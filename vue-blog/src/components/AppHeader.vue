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

const linkClasses = "text-gray-600 hover:text-white hover:bg-purple-600 transition duration-200 px-6 py-3 rounded-md text-sm font-medium";
const activeLinkClasses = "text-white bg-purple-600 font-semibold";

const isActiveLink = (link: VueNavLink) => route.path === link.url;
</script>
<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold text-gray-800 hover:text-purple-700 transition-colors">
        My Vue Blog
      </RouterLink>
      <nav class="space-x-2">
        <div class="flex gap-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.id"
            :to="link.url"
            :class="[linkClasses, isActiveLink(link) ? activeLinkClasses : '']"
          >
            {{ link.title }}
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
