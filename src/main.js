import { createApp } from 'vue';




import router from './router';
import App from './App.vue';
import Compte from './views/Compte.vue';



const app = createApp(Compte);
app.use(router);
app.mount('#app');
