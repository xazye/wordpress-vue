<script setup lang="ts">
import {watchEffect,ref} from 'vue'
import {useGetWordpressSidebarApi} from '../composables/useSidebar.ts'

const {
  sidebar,
  fetchSidebarByID
} = useGetWordpressSidebarApi();

watchEffect(async()=>{
    fetchSidebarByID('sidebar-footer')
})
</script>

<template>
    <div>
        <div v-if="sidebar" v-html="sidebar"></div>
    </div>
</template>

<style scoped>
</style>