// src/stores/auth.ts

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Interface pour les informations de l'utilisateur
interface UserInfo {
  id: string | null;
  organizationName: string | null;
  email: string | null;
}

export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  const token = ref<string | null>(localStorage.getItem('userToken'));
  const permissions = ref<string[]>(JSON.parse(localStorage.getItem('userPermissions') || '[]'));
  const userInfo = ref<UserInfo>(JSON.parse(localStorage.getItem('userInfo') || '{}'));

  // --- GETTERS ---
  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => permissions.value.includes('*'));

  // --- ACTIONS ---
  function setLoginData(loginResponse: { token: string; permissions: string[]; user_id: string; organization_name: string; }, userEmail: string) {
    token.value = loginResponse.token;
    permissions.value = loginResponse.permissions;
    userInfo.value = {
      id: loginResponse.user_id,
      organizationName: loginResponse.organization_name,
      email: userEmail,
    };

    localStorage.setItem('userToken', token.value);
    localStorage.setItem('userPermissions', JSON.stringify(permissions.value));
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
  }

  function logout() {
    token.value = null;
    permissions.value = [];
    userInfo.value = { id: null, organizationName: null, email: null };

    localStorage.removeItem('userToken');
    localStorage.removeItem('userPermissions');
    localStorage.removeItem('userInfo');
  }

  return {
    token,
    permissions,
    userInfo,
    isAuthenticated,
    isAdmin,
    setLoginData,
    logout,
  };
});
