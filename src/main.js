import { createApp } from 'vue';

import App from './Acceuil.vue';
import Login from './views/Login.vue';
import router from './router';
import Dashboard from './views/Dashboard.vue';
import Transaction from './views/Transaction.vue';
import Alertes from './views/Alertes.vue';
import Compte from './views/Compte.vue';
import Rapports from './views/Rapports.vue';
import Parametres from './views/Parametres.vue';
import Acceuil from './Acceuil.vue';



const app = createApp(Parametres);
app.use(router);
app.mount('#app');
