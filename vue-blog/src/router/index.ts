import { createWebHistory, createRouter } from 'vue-router'; // Import createWebHistory

// Import components used in routes
// Using relative paths from the 'router' directory
import App from '../App.vue'; // Adjust path as needed if App isn't the root layout for all routes
// import HelloWorld from '../components/HelloWorld.vue'; // Removed import
import WPPagesList from '../components/WPPagesList.vue';
import WPPageSingle from '../components/WPPageSingle.vue';

const routes = [
    // Consider if App should be a layout wrapper rather than a route component itself
    // Or define a root path component specifically for '/'
    { path: '/', name: 'Home', component: WPPagesList }, // Example: Make Pages list the home page
    { path: '/pages', name: 'WP Pages', component: WPPagesList },
    // Use props: true to pass route params as component props (cleaner than using $route.params directly)
    { path: '/pages/:page', component: WPPageSingle, props: true },
];

const router = createRouter({
    history: createWebHistory(), // Use standard web history for clean URLs
    routes,
});

export default router;
