import Parametres from '@/views/Parametres.vue';
import { name } from 'normalize-range';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
  path: '/Compte',
  name: 'Compte',
  component: () => import('@/views/Compte.vue')
},
{
  path:'',
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
},
{
  path:'/login',
  name:'login',
    component: () => import('@/views/Login.vue')
},



 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
