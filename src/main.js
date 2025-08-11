import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous que le fichier est bien nommé et importé

const app = createApp(App);
app.use(router);
app.mount('#app');
