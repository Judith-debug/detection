import { createRouter, createWebHistory } from 'vue-router';
import Compte from '@/views/Compte.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login' // Redirige la racine vers la page de login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard pour rediriger vers la page de login
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !to.path.startsWith('/layout')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
