<script setup lang="ts">
import {ref, watchEffect, type Ref} from 'vue'
import {useGetWordpressSidebarApi} from '../composables/useSidebar.ts'
import { useNavigation, type VueNavLink } from '../composables/useNavigation.ts';

const navLinks:Ref<VueNavLink[]> = ref([]);
const {
  sidebar,
  fetchSidebarByID
} = useGetWordpressSidebarApi();

watchEffect(async()=>{
    fetchSidebarByID('sidebar-footer')
    navLinks.value = await useNavigation();
})
</script>

<template>
    <footer class="bg-gray-800 text-gray-300 py-8 mt-12">
        <div class="container mx-auto px-4">
            <!-- Sidebar Widget Area -->
            <ul v-if="sidebar" v-html="sidebar" class="mb-6"></ul>

            <!-- Navigation Links -->
            <nav class="footer-nav mb-6 text-center">
                <RouterLink
                    v-for="link in navLinks"
                    :key="link.id"
                    :to="link.url"
                    class="text-gray-400 hover:text-purple-300 px-3 py-2 transition-colors duration-200"
                >
                    {{ link.title }}
                </RouterLink>
            </nav>

            <!-- Credit -->
            <div class="w-full flex justify-center text-sm text-gray-500">
                <span>Made by <a href="https://github.com/xazye" class="text-gray-400 hover:text-purple-300 underline transition-colors duration-200">Xazye</a></span>
            </div>
        </div>
    </footer>
</template>

<style scoped>

</style>
