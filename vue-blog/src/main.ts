import { createApp } from 'vue';
import router from './router'; // Import the router instance from the new file
import './style.css';
import App from './App.vue';

// Create the Vue app instance, use the router, and mount it
const app = createApp( App );
app.use(router)
app.mount('#app');
