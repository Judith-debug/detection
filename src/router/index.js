import { createRouter, createWebHistory } from 'vue-router';
import Compte from '@/views/Compte.vue';
import Login from '@/views/Login.vue'


const routes = [
  {
    path: '',
    name: 'Compte',
    component: Compte
  },
  {
    path:'/login',
    name:'login',
    component: Login
  },
  
  {
    path:'/layout',
    name:'layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      
      {
          path:'/dashboard',
          name:'dashboard',
            component: () => import('@/views/Dashboard.vue')
        },
        {
          path:'/transaction',
          name:'transaction',
            component: () => import('@/views/Transaction.vue')
        },
        {
          path:'/rapports',
          name:'rapports',
            component: () => import('@/views/Rapports.vue')
        },
        {
          path:'/alertes',
          name:'alertes',
            component: () => import('@/views/Alertes.vue')
        },
        {
          path: '/parametres',
          name: 'parametres',
          component: () => import ('@/views/Parametres.vue')
        }
      ]
  }
  

];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
