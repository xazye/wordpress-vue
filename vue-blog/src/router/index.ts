import { createWebHistory, createRouter } from 'vue-router'; 

import WPPostList from '../components/WPPostList.vue';
import WPPageSingle from '../components/WPPageSingle.vue';
import WPPostSingle from '../components/WPPostSingle.vue';

const routes = [
    { path: '/', name: 'Home', component: WPPostList }, 
    { path: '/page/:page', component: WPPageSingle, props: true },
    { path: '/post/:post', component: WPPostSingle, props: true },
];

const router = createRouter({
    history: createWebHistory(), // Use standard web history for clean URLs
    routes,
});

export default router;
