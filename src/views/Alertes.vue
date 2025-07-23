<template>
  <div class="alerts-page">
    <div class="burger-menu" @click="toggleSidebar">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <nav class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <svg class="shield-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="white"/>
            <path d="M9 12L11 14L15 10" stroke="#0F7CBC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="logo-text" v-if="!isSidebarCollapsed">Fraud Stop</span>
        </div>
      </div>

      <div class="nav-menu">
        <a href="#" class="nav-item active">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">Dashboard</span>
        </a>

        <a href="#" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">Transactions</span>
        </a>

        <a href="#" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2"/>
            <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">Alertes</span>
        </a>

        <a href="#" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">Rapports</span>
        </a>

        <a href="#" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2579 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.01127 9.77251C4.28054 9.5799 4.48571 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">Paramètres</span>
        </a>
      </div>

      <div class="nav-bottom">
        <a href="#" class="nav-item logout">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">Déconnexion</span>
        </a>
      </div>
    </nav>

    <div class="main-content" :class="{ 'main-content-expanded': isSidebarCollapsed }">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Centre d'Alertes</h1>
          <p class="page-subtitle">Surveillance en temps réel des activités suspectes</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" stroke="currentColor" stroke-width="2"/>
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            Configurer
          </button>
          <button class="btn-primary">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            </svg>
            Temps réel
          </button>
        </div>
      </div>

      <div class="alert-stats">
        <div class="stat-card critical">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">12</span>
            <span class="stat-label">Alertes critiques</span>
          </div>
          <div class="stat-trend up">+3 depuis 1h</div>
        </div>

        <div class="stat-card warning">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2"/>
              <path d="M12 9V13" stroke="currentColor" stroke-width="2"/>
              <path d="M12 17H12.01" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">47</span>
            <span class="stat-label">Alertes moyennes</span>
          </div>
          <div class="stat-trend down">-8 depuis 1h</div>
        </div>

        <div class="stat-card info">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">156</span>
            <span class="stat-label">Alertes informatives</span>
          </div>
          <div class="stat-trend up">+12 depuis 1h</div>
        </div>

        <div class="stat-card resolved">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">89</span>
            <span class="stat-label">Résolues aujourd'hui</span>
          </div>
          <div class="stat-trend up">+15 depuis 1h</div>
        </div>
      </div>

      <div class="filters-section">
        <div class="filter-group">
          <select class="filter-select">
            <option value="">Toutes les priorités</option>
            <option value="critical">Critique</option>
            <option value="high">Élevée</option>
            <option value="medium">Moyenne</option>
            <option value="low">Faible</option>
          </select>

          <select class="filter-select">
            <option value="">Tous les types</option>
            <option value="fraud">Fraude détectée</option>
            <option value="velocity">Vitesse anormale</option>
            <option value="amount">Montant suspect</option>
            <option value="pattern">Motif inhabituel</option>
          </select>

          <select class="filter-select">
            <option value="">Tous les statuts</option>
            <option value="new">Nouvelle</option>
            <option value="investigating">En cours</option>
            <option value="resolved">Résolue</option>
            <option value="dismissed">Ignorée</option>
          </select>
        </div>
      </div>

      <div class="alerts-container">
        <div class="alerts-header">
          <h2>Alertes récentes</h2>
          <div class="auto-refresh">
            <span class="refresh-indicator active"></span>
            <span>Actualisation automatique</span>
          </div>
        </div>

        <div class="alerts-list">
          <div v-for="alert in alerts" :key="alert.id" class="alert-item" :class="alert.priority">
            <div class="alert-priority">
              <div class="priority-indicator" :class="alert.priority"></div>
            </div>

            <div class="alert-content">
              <div class="alert-header">
                <h3 class="alert-title">{{ alert.title }}</h3>
                <div class="alert-meta">
                  <span class="alert-time">{{ formatTime(alert.timestamp) }}</span>
                  <span class="alert-type">{{ alert.type }}</span>
                </div>
              </div>

              <p class="alert-description">{{ alert.description }}</p>

              <div class="alert-details">
                <div class="detail-item">
                  <span class="detail-label">Transaction:</span>
                  <span class="detail-value">{{ alert.transactionId }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Utilisateur:</span>
                  <span class="detail-value">{{ alert.user }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Montant:</span>
                  <span class="detail-value">{{ formatAmount(alert.amount) }} FCFA</span>
                </div>
              </div>
            </div>

            <div class="alert-actions">
              <button class="action-btn investigate" title="Enquêter">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
              <button class="action-btn resolve" title="Résoudre">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
              <button class="action-btn dismiss" title="Ignorer">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Alert {
  id: string
  title: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  type: string
  timestamp: string
  transactionId: string
  user: string
  amount: number
  status: 'new' | 'investigating' | 'resolved' | 'dismissed'
}

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const alerts = ref<Alert[]>([
  {
    id: 'ALT-001',
    title: 'Transaction suspecte détectée',
    description: 'Montant anormalement élevé pour ce profil utilisateur (10x la moyenne)',
    priority: 'critical',
    type: 'Fraude détectée',
    timestamp: '2024-01-15T14:35:22',
    transactionId: 'TXN-2024-001248',
    user: 'Amadou TRAORE (+226 70 12 34 56)',
    amount: 500000,
    status: 'new'
  },
  {
    id: 'ALT-002',
    title: 'Vitesse de transaction anormale',
    description: '15 transactions en moins de 5 minutes depuis le même appareil',
    priority: 'high',
    type: 'Vitesse anormale',
    timestamp: '2024-01-15T14:32:15',
    transactionId: 'TXN-2024-001247',
    user: 'Fatima OUEDRAOGO (+226 75 98 76 54)',
    amount: 25000,
    status: 'investigating'
  },
  {
    id: 'ALT-003',
    title: 'Nouveau motif de transaction',
    description: 'Première transaction vers cette région géographique',
    priority: 'medium',
    type: 'Motif inhabituel',
    timestamp: '2024-01-15T14:28:45',
    transactionId: 'TXN-2024-001246',
    user: 'Ibrahim KONE (+226 78 45 67 89)',
    amount: 75000,
    status: 'new'
  },
  {
    id: 'ALT-004',
    title: 'Heure de transaction inhabituelle',
    description: 'Transaction effectuée en dehors des heures habituelles (3h du matin)',
    priority: 'medium',
    type: 'Motif inhabituel',
    timestamp: '2024-01-15T03:15:30',
    transactionId: 'TXN-2024-001245',
    user: 'Mariam SAWADOGO (+226 76 23 45 67)',
    amount: 150000,
    status: 'resolved'
  }
])

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)

  if (minutes < 60) {
    return `Il y a ${minutes} min`
  } else if (hours < 24) {
    return `Il y a ${hours}h`
  } else {
    return date.toLocaleDateString('fr-FR')
  }
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount)
}

onMounted(() => {
  // Simulation de mise à jour en temps réel
  setInterval(() => {
    // Logique de mise à jour des alertes
  }, 30000)
})
</script>

<style scoped>
.alerts-page {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
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
  font-size: 1.25rem;
  font-weight: 600;
  font-size: 1.5rem;
  white-space: nowrap;
}

.nav-menu {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border-right: 3px solid white;
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
  margin-left: 280px;
  padding: 2rem;
  width: calc(100% - 280px);
  transition: all 0.3s ease;
}

.main-content-expanded {
  margin-left: 80px;
  width: calc(100% - 80px);
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  padding: 2rem;
  border-radius: 16px;
  color: white;
}

.header-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: white;
  color: #1e40af;
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.icon {
  width: 18px;
  height: 18px;
}

/* Statistiques d'alertes */
.alert-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}

.stat-card.critical::before {
  background-color: #ef4444;
}

.stat-card.warning::before {
  background-color: #f59e0b;
}

.stat-card.info::before {
  background-color: #3b82f6;
}

.stat-card.resolved::before {
  background-color: #10b981;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.critical .stat-icon {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.warning .stat-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.info .stat-icon {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.resolved .stat-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  display: block;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

.stat-trend {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.stat-trend.up {
  background-color: #dcfce7;
  color: #166534;
}

.stat-trend.down {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Filtres */
.filters-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  min-width: 180px;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
}

/* Container des alertes */
.alerts-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.alerts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.alerts-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.auto-refresh {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.refresh-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
}

.refresh-indicator.active {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Liste des alertes */
.alerts-list {
  max-height: 600px;
  overflow-y: auto;
}

.alert-item {
  display: flex;
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s ease;
}

.alert-item:hover {
  background-color: #f8fafc;
}

.alert-item:last-child {
  border-bottom: none;
}

.alert-priority {
  margin-right: 1rem;
}

.priority-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 0.25rem;
}

.priority-indicator.critical {
  background-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.priority-indicator.high {
  background-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
}

.priority-indicator.medium {
  background-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.priority-indicator.low {
  background-color: #6b7280;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.2);
}

.alert-content {
  flex: 1;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.alert-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.alert-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #64748b;
}

.alert-type {
  background-color: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 500;
}

.alert-description {
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.alert-details {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.detail-label {
  color: #64748b;
  font-weight: 500;
}

.detail-value {
  color: #1e293b;
  font-weight: 600;
}

.alert-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: #f8fafc;
}

.action-btn.investigate:hover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.action-btn.resolve:hover {
  border-color: #10b981;
  background-color: #ecfdf5;
}

.action-btn.dismiss:hover {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.action-btn svg {
  width: 16px;
  height: 16px;
  color: #64748b;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    width: 100%;
    padding: 1rem;
  }

  .main-content-expanded {
    margin-left: 0;
    width: 100%;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .alert-stats {
    grid-template-columns: 1fr;
  }

  .filter-group {
    flex-direction: column;
  }

  .filter-select {
    min-width: auto;
  }

  .alert-item {
    flex-direction: column;
    gap: 1rem;
  }

  .alert-actions {
    margin-left: 0;
    justify-content: flex-end;
  }

  .alert-details {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
