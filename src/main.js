import { createApp } from 'vue';




import router from './router';
import App from './App.vue';
import Compte from './views/Compte.vue';
import Login from './views/Login.vue'



const app = createApp(App);
app.use(router);
app.mount('#app');
