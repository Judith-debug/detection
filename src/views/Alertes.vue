<template>
  <div class="alerts-page">
   
    <div class="main-content" :class="{ 'main-content-expanded': isSidebarCollapsed }">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Centre d'Alertes</h1>
          <p class="page-subtitle">Surveillance en temps réel des activités suspectes</p>
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
  margin-left: -280px;
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
