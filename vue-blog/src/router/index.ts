import { createWebHistory, createRouter } from 'vue-router'; 

import WPPagesList from '../components/WPPagesList.vue';
import WPPageSingle from '../components/WPPageSingle.vue';

const routes = [
    { path: '/', name: 'Home', component: WPPagesList }, 
    { path: '/pages', name: 'WP Pages', component: WPPagesList },
    { path: '/pages/:page', component: WPPageSingle, props: true },
];

const router = createRouter({
    history: createWebHistory(), // Use standard web history for clean URLs
    routes,
});

export default router;
