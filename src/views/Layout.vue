<template>
  <div class="dashboard-container">
    <div v-if="!isSidebarCollapsed" class="burger-menu" @click="toggleSidebar">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <nav class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <div class="sidebar-header" @click="toggleSidebar">
        <div class="logo">
          <svg class="shield-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="white"/>
            <path d="M9 12L11 14L15 10" stroke="#0F7CBC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="logo-text" v-if="!isSidebarCollapsed">Fraud Stop</span>
        </div>
      </div>
      
    
      <div class="nav-menu">
       
        <router-link
          v-for="navLink in visibleNavLinks"
          :key="navLink.name"
          :to="{ name: navLink.name }"
          class="nav-item"
          :class="{ 'active-link': activeLink === navLink.name }"
          @click="setActiveLink(navLink.name )"
        >
        
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="navLink.iconPath"></svg>
          <span v-if="!isSidebarCollapsed">{{ navLink.text }}</span>
        </router-link>
      </div>
      
      <div class="nav-bottom">
        <a @click.prevent="handleLogout" class="nav-item logout" style="cursor: pointer;">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">Déconnexion</span>
        </a>
      </div>
    </nav>
    <main class="main-content" :class="{ 'main-content-expanded': isSidebarCollapsed }">
      <header class="header">
        <div class="header-right">
          <div class="notification-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="user-profile" @click="toggleUserInfo">
            <div class="user-avatar"> <img src="/src/assets/Capture.png" alt="User Avatar" /></div>
            <span class="user-name">{{ authStore.userInfo.organizationName }}</span>
          </div>
        </div>
      </header>
      <div v-if="showUserInfo" class="user-info-modal">
        <div class="user-info-content">
          <h2>Informations de l'utilisateur</h2>
          <p><strong>Nom d'organisation:</strong> {{ authStore.userInfo.organizationName }}</p>
          <p><strong>Email:</strong> {{ authStore.userInfo.email }}</p>
        </div>
      </div>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore( );
const router = useRouter();

const isSidebarCollapsed = ref(false);
const showUserInfo = ref(false);
const activeLink = ref('dashboard');

const toggleSidebar = () => { isSidebarCollapsed.value = !isSidebarCollapsed.value; };
const toggleUserInfo = () => { showUserInfo.value = !showUserInfo.value; };
const setActiveLink = (link: string) => { activeLink.value = link; };

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'login' }); 
};


const allNavLinks = [
  { 
    name: 'dashboard', 
    text: 'Dashboard', 
    permission: 'dashboard', 
    iconPath: `<path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` 
  },
  { 
    name: 'transaction', 
    text: 'Transactions', 
    permission: 'transactions', 
    iconPath: `<path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` 
  },
  { 
    name: 'alertes', 
    text: 'Alertes', 
    permission: 'alerts', 
    iconPath: `<path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` 
  },
  { 
    name: 'rapports', 
    text: 'Rapports', 
    permission: 'reports', 
    iconPath: `<path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` 
  },
  { 
    name: 'userManagement', 
    text: 'Gestion Utilisateurs', 
    permission: 'userManagement', 
    iconPath: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>` 
  },
  { 
    name: 'roleManagement', 
    text: 'Gestion des Rôles', 
    permission: 'roleManagement', 
    iconPath: `<path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16C4 12 7 8 12 8C17 8 20 12 20 16C20 20 17 20 12 20C7 20 4 20 4 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` 
  },
  { 
    name: 'parametres', 
    text: 'Paramètres', 
    permission: 'settings', 
    iconPath: `<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a... (chemin complet)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` 
  }
];


const visibleNavLinks = computed(() => {
  const userPermissions = authStore.permissions;  
  
  if (!userPermissions || userPermissions.length === 0) {
    return [];
  }

  
  if (userPermissions.includes('*')) {
    return allNavLinks;
  }

  
  return allNavLinks.filter(link => userPermissions.includes(link.permission));
});

</script>




<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: sans-serif;
}

.burger-menu {
  position: fixed;
  top: 1.6rem;
  left: 15rem;
  z-index: 1001;
  width: 40px;
  height: 40px;
  background-color: #1e40af;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
}

.burger-menu svg {
  width: 24px;
  height: 24px;
}

.sidebar {
  width: 280px;
  background-color: #1e40af;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.70rem;
}

.shield-icon {
  width: 50px;
  height: 49px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 600;
  white-space: nowrap;
}

.nav-menu {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1.9rem;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1.2rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-icon {
  width: 25px;
  height: 25px;
  stroke: currentColor;
  min-width: 25px;
}

.nav-bottom {
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.main-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.main-content-expanded {
  margin-left: 80px;
}

.header {
  background-color: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.notification-icon {
  width: 28px;
  height: 24px;
  color: #64748b;
  cursor: pointer;
}

.notification-icon:hover {
  color: #0F7CBC;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 1rem;
  font-weight: 500;
  color: #1e293b;
}

.user-info-modal {
  position: fixed;
  top: 70px;
  right: 20px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1002;
}

.user-info-content h2 {
  margin-top: 0;
  font-size: 1.2rem;
}

.user-info-content p {
  margin: 0.5rem 0;
}

.active-link {
  background-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .sidebar-collapsed {
    transform: translateX(0);
  }
  .main-content {
    margin-left: 0;
  }
  .main-content-expanded {
    margin-left: 0;
  }
  .dashboard-content {
    padding: 1rem;
  }
  .header {
    padding: 1rem;
  }
  .user-name {
    display: none;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    gap: 1rem;
  }
  .stat-card {
    padding: 1rem;
  }
  .chart-card {
    padding: 1rem;
  }
  .charts-grid {
    gap: 1rem;
  }
}
</style>
