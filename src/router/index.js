import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/views/Compte.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Compte from '@/views/Compte.vue';
import Acceuil from '@/Acceuil.vue';

const routes = [
  {
  path: '/Compte',
  name: 'Compte',
  component: () => import('@/views/Compte.vue')
}


 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
