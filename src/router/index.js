import { createRouter, createWebHistory } from 'vue-router';
import Compte from '@/views/Compte.vue';
import Login from '@/views/Login.vue';
import LoginUser from '@/views/LoginUser.vue';

const routes = [
  {
    path: '/',
    redirect: '/login' 
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/loginuser',
    name: 'loginuser',
    component: ()=> import('@/views/LoginUser.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'transaction',
        name: 'transaction',
        component: () => import('@/views/Transaction.vue')
      },
      {
        path: 'rapports',
        name: 'rapports',
        component: () => import('@/views/Rapports.vue')
      },
      {
        path: 'alertes',
        name: 'alertes',
        component: () => import('@/views/Alertes.vue')
      },
      {
        path: 'parametres',
        name: 'parametres',
        component: () => import('@/views/Parametres.vue')
      },
      {
        path: 'user-management',
        name: 'userManagement',
        component: () => import('@/views/UserManagement.vue')
      },

      {
         path: 'role-management',
         name: 'roleManagement',
        component: () => import('@/views/RoleManagement.vue')
      }


      
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard pour rediriger vers la page de login


export default router;
