<template>
  <div class="transactions-page">
    

    <div class="main-content" :class="{ 'main-content-expanded': isSidebarCollapsed }">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Transactions Mobile Money</h1>
          <p class="page-subtitle">Surveillance et détection automatique de fraude</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="exportTransactions">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Exporter
          </button>
          <button class="btn-primary" @click="showFilters = !showFilters">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6V4Z" stroke="currentColor" stroke-width="2"/>
              <path d="M3 10C3 9.44772 3.44772 9 4 9H20C20.5523 9 21 9.44772 21 10V12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12V10Z" stroke="currentColor" stroke-width="2"/>
              <path d="M3 16C3 15.4477 3.44772 15 4 15H20C20.5523 15 21 15.4477 21 16V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18V16Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            Filtrer
          </button>
        </div>
      </div>

      <div class="quick-stats">
        <div class="stat-card">
          <div class="stat-icon transactions">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">1,247</span>
            <span class="stat-label">Transactions aujourd'hui</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon fraud">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">23</span>
            <span class="stat-label">Fraudes détectées</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon amount">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 19.9999 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">2.4M</span>
            <span class="stat-label">Volume total (FCFA)</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon rate">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">98.2%</span>
            <span class="stat-label">Taux de réussite</span>
          </div>
        </div>
      </div>

      <div class="filters-section" v-if="showFilters">
        <div class="filter-group">
          <div class="filter-item">
            <label for="status-filter">Statut</label>
            <select id="status-filter" v-model="statusFilter" class="filter-select">
              <option value="">Tous les statuts</option>
              <option value="success">Réussie</option>
              <option value="fraud">Fraude détectée</option>
              <option value="pending">En attente</option>
              <option value="failed">Échouée</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="type-filter">Type de transaction</label>
            <select id="type-filter" v-model="typeFilter" class="filter-select">
              <option value="">Tous les types</option>
              <option value="transfer">Transfert</option>
              <option value="payment">Paiement</option>
              <option value="withdrawal">Retrait</option>
              <option value="deposit">Dépôt</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="date-filter">Date</label>
            <input type="date" id="date-filter" v-model="dateFilter" class="filter-date">
          </div>

          <div class="filter-item">
            <label for="amount-filter">Montant</label>
            <div class="amount-filter">
              <input type="number" id="amount-filter" v-model="amountFilter" placeholder="Montant minimum" class="filter-input">
              <span class="currency">FCFA</span>
            </div>
          </div>

          <button class="btn-clear-filters" @click="clearFilters">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
            </svg>
            Effacer les filtres
          </button>
        </div>
      </div>

      <div class="transactions-container">
        <div class="transactions-header">
          <h2>Transactions récentes</h2>
          <div class="transactions-actions">
            <button class="btn-icon" @click="refreshTransactions" title="Actualiser">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4V10H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.49 9C19.9828 7.56678 19.1209 6.28392 17.9845 5.27304C16.8482 4.26216 15.4745 3.55691 13.9917 3.21834C12.5089 2.87977 10.9652 2.91902 9.50481 3.33311C8.04437 3.74721 6.70475 4.52334 5.60999 5.59" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.51001 15C4.01716 16.4332 4.87906 17.7161 6.01543 18.727C7.1518 19.7378 8.52547 20.4431 10.0083 20.7817C11.4911 21.1202 13.0348 21.081 14.4952 20.6669C15.9556 20.2528 17.2953 19.4767 18.39 18.41" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="transactions-table-container">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>ID Transaction</th>
                <th>Date & Heure</th>
                <th>Expéditeur</th>
                <th>Destinataire</th>
                <th>Montant</th>
                <th>Type</th>
                <th>Statut</th>
                <th>Score Fraude</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in filteredTransactions" :key="transaction.id">
                <td class="transaction-id">{{ transaction.id }}</td>
                <td class="transaction-date">
                  <div class="date-time">
                    <span class="date">{{ formatDate(transaction.date) }}</span>
                    <span class="time">{{ formatTime(transaction.date) }}</span>
                  </div>
                </td>
                <td class="sender">
                  <div class="user-info">
                    <div class="user-avatar">{{ getInitials(transaction.sender.name) }}</div>
                    <div class="user-details">
                      <span class="user-name">{{ transaction.sender.name }}</span>
                      <span class="user-phone">{{ transaction.sender.phone }}</span>
                    </div>
                  </div>
                </td>
                <td class="receiver">
                  <div class="user-info">
                    <div class="user-avatar">{{ getInitials(transaction.receiver.name) }}</div>
                    <div class="user-details">
                      <span class="user-name">{{ transaction.receiver.name }}</span>
                      <span class="user-phone">{{ transaction.receiver.phone }}</span>
                    </div>
                  </div>
                </td>
                <td class="amount">
                  <span class="amount-value">{{ formatAmount(transaction.amount) }}</span>
                  <span class="currency">FCFA</span>
                </td>
                <td class="type">
                  <span class="type-badge" :class="transaction.type">{{ formatType(transaction.type) }}</span>
                </td>
                <td class="status">
                  <span class="status-badge" :class="transaction.status">
                    <span class="status-dot"></span>
                    {{ formatStatus(transaction.status) }}
                  </span>
                </td>
                <td class="fraud-score">
                  <div class="score-container">
                    <div class="score-bar">
                      <div class="score-fill" :class="getRiskClass(transaction.fraudScore)" :style="{ width: transaction.fraudScore + '%' }"></div>
                    </div>
                    <span class="score-value" :class="getRiskClass(transaction.fraudScore)">{{ transaction.fraudScore }}%</span>
                  </div>
                </td>
                <td class="actions">
                  <div class="action-buttons">
                    <button class="btn-action" title="Voir détails" @click="viewDetails(transaction)">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </button>
                    <button class="btn-action" title="Marquer comme fraude" @click="markAsFraud(transaction)" v-if="transaction.status !== 'fraud'">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 9V13" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 17H12.01" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination">
          <div class="pagination-info">
            Affichage de {{ currentPage * itemsPerPage - itemsPerPage + 1 }} à {{ Math.min(currentPage * itemsPerPage, totalItems) }} sur {{ totalItems }} transactions
          </div>
          <div class="pagination-controls">
            <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Précédent
            </button>
            <div class="pagination-numbers">
              <button v-for="page in visiblePages" :key="page" class="pagination-number" :class="{ 'active': page === currentPage }" @click="goToPage(page)">
                {{ page }}
              </button>
              <span class="pagination-dots" v-if="totalPages > 5 && currentPage < totalPages - 2">...</span>
            </div>
            <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">
              Suivant
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Transaction {
  id: string
  date: Date
  sender: {
    name: string
    phone: string
  }
  receiver: {
    name: string
    phone: string
  }
  amount: number
  type: string
  status: string
  fraudScore: number
}

const isSidebarCollapsed = ref(false)
const showFilters = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

const transactions = ref<Transaction[]>([
  {
    id: 'TXN-2024-001247',
    date: new Date('2024-01-15T14:30:00'),
    sender: {
      name: 'Amadou TRAORE',
      phone: '+226 70 12 34 56'
    },
    receiver: {
      name: 'Fatima OUEDRAOGO',
      phone: '+226 75 98 76 54'
    },
    amount: 50000,
    type: 'transfer',
    status: 'success',
    fraudScore: 15
  },
  {
    id: 'TXN-2024-001248',
    date: new Date('2024-01-15T13:45:00'),
    sender: {
      name: 'Ibrahim KONE',
      phone: '+226 78 45 67 89'
    },
    receiver: {
      name: 'Mariam SAWADOGO',
      phone: '+226 76 23 45 67'
    },
    amount: 25000,
    type: 'payment',
    status: 'success',
    fraudScore: 5
  },
  {
    id: 'TXN-2024-001249',
    date: new Date('2024-01-15T12:20:00'),
    sender: {
      name: 'Oumar SANOGO',
      phone: '+226 71 23 45 67'
    },
    receiver: {
      name: 'Aminata COULIBALY',
      phone: '+226 77 89 01 23'
    },
    amount: 75000,
    type: 'withdrawal',
    status: 'fraud',
    fraudScore: 85
  },
  {
    id: 'TXN-2024-001250',
    date: new Date('2024-01-15T11:10:00'),
    sender: {
      name: 'Yacouba DIAKITE',
      phone: '+226 73 45 67 89'
    },
    receiver: {
      name: 'Kadiatou TRAORE',
      phone: '+226 79 01 23 45'
    },
    amount: 15000,
    type: 'deposit',
    status: 'success',
    fraudScore: 8
  },
  {
    id: 'TXN-2024-001251',
    date: new Date('2024-01-15T10:05:00'),
    sender: {
      name: 'Siaka SANGO',
      phone: '+226 74 56 78 90'
    },
    receiver: {
      name: 'Fanta KONE',
      phone: '+226 70 12 34 56'
    },
    amount: 100000,
    type: 'transfer',
    status: 'pending',
    fraudScore: 45
  },
  {
    id: 'TXN-2024-001252',
    date: new Date('2024-01-15T09:30:00'),
    sender: {
      name: 'Bakary COULIBALY',
      phone: '+226 72 34 56 78'
    },
    receiver: {
      name: 'Awa TRAORE',
      phone: '+226 78 90 12 34'
    },
    amount: 35000,
    type: 'payment',
    status: 'success',
    fraudScore: 12
  },
  {
    id: 'TXN-2024-001253',
    date: new Date('2024-01-15T08:45:00'),
    sender: {
      name: 'Moussa DIAKITE',
      phone: '+226 75 67 89 01'
    },
    receiver: {
      name: 'Kadidia SANOGO',
      phone: '+226 71 23 45 67'
    },
    amount: 60000,
    type: 'withdrawal',
    status: 'failed',
    fraudScore: 30
  },
  {
    id: 'TXN-2024-001254',
    date: new Date('2024-01-15T08:00:00'),
    sender: {
      name: 'Drissa KONE',
      phone: '+226 73 45 67 89'
    },
    receiver: {
      name: 'Aminata TRAORE',
      phone: '+226 70 12 34 56'
    },
    amount: 20000,
    type: 'deposit',
    status: 'success',
    fraudScore: 3
  },
  {
    id: 'TXN-2024-001255',
    date: new Date('2024-01-14T17:30:00'),
    sender: {
      name: 'Fousseyni SANOGO',
      phone: '+226 77 89 01 23'
    },
    receiver: {
      name: 'Bintou COULIBALY',
      phone: '+226 74 56 78 90'
    },
    amount: 45000,
    type: 'transfer',
    status: 'success',
    fraudScore: 7
  },
  {
    id: 'TXN-2024-001256',
    date: new Date('2024-01-14T16:45:00'),
    sender: {
      name: 'Adama DIAKITE',
      phone: '+226 71 23 45 67'
    },
    receiver: {
      name: 'Kadiatou KONE',
      phone: '+226 78 90 12 34'
    },
    amount: 80000,
    type: 'payment',
    status: 'fraud',
    fraudScore: 92
  },
  {
    id: 'TXN-2024-001257',
    date: new Date('2024-01-14T15:20:00'),
    sender: {
      name: 'Mamadou TRAORE',
      phone: '+226 70 12 34 56'
    },
    receiver: {
      name: 'Aissata SANOGO',
      phone: '+226 73 45 67 89'
    },
    amount: 25000,
    type: 'withdrawal',
    status: 'success',
    fraudScore: 10
  },
  {
    id: 'TXN-2024-001258',
    date: new Date('2024-01-14T14:10:00'),
    sender: {
      name: 'Karim COULIBALY',
      phone: '+226 75 67 89 01'
    },
    receiver: {
      name: 'Fatoumata DIAKITE',
      phone: '+226 72 34 56 78'
    },
    amount: 30000,
    type: 'deposit',
    status: 'pending',
    fraudScore: 55
  }
])

const statusFilter = ref('')
const typeFilter = ref('')
const dateFilter = ref('')
const amountFilter = ref(0)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const exportTransactions = () => {
  alert('Export des transactions')
}

const refreshTransactions = () => {
  alert('Actualisation des transactions')
}

const clearFilters = () => {
  statusFilter.value = ''
  typeFilter.value = ''
  dateFilter.value = ''
  amountFilter.value = 0
}

const viewDetails = (transaction: Transaction) => {
  alert(`Détails de la transaction ${transaction.id}`)
}

const markAsFraud = (transaction: Transaction) => {
  if (confirm(`Voulez-vous vraiment marquer la transaction ${transaction.id} comme fraude?`)) {
    transaction.status = 'fraud'
  }
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR')
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount)
}

const formatType = (type: string) => {
  const types: Record<string, string> = {
    transfer: 'Transfert',
    payment: 'Paiement',
    withdrawal: 'Retrait',
    deposit: 'Dépôt'
  }
  return types[type] || type
}

const formatStatus = (status: string) => {
  const statuses: Record<string, string> = {
    success: 'Réussie',
    fraud: 'Fraude',
    pending: 'En attente',
    failed: 'Échouée'
  }
  return statuses[status] || status
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2)
}

const getRiskClass = (score: number) => {
  if (score < 30) return 'low-risk'
  if (score < 70) return 'medium-risk'
  return 'high-risk'
}

const filteredTransactions = computed(() => {
  return transactions.value
    .filter(t => statusFilter.value ? t.status === statusFilter.value : true)
    .filter(t => typeFilter.value ? t.type === typeFilter.value : true)
    .filter(t => dateFilter.value ? formatDate(t.date) === formatDate(new Date(dateFilter.value)) : true)
    .filter(t => amountFilter.value ? t.amount >= amountFilter.value : true)
})

const totalItems = computed(() => filteredTransactions.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const startPage = Math.max(1, currentPage.value - 2)
  const endPage = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTransactions.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped>
.transactions-page {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  margin-left: -270px;
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
  flex: 1;
  padding: 2rem;
  transition: all 0.3s ease;
}

.main-content-expanded {
  margin-left: 80px;
}

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

.btn-primary:hover {
  background-color: #f1f5f9;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.icon {
  width: 18px;
  height: 18px;
}

.quick-stats {
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
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
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

.stat-icon.transactions {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stat-icon.fraud {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.stat-icon.amount {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.rate {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

.filters-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.filter-item label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.filter-select, .filter-date, .filter-input {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.filter-select:focus, .filter-date:focus, .filter-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.amount-filter {
  position: relative;
}

.currency {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.btn-clear-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #ef4444;
  background: white;
  color: #ef4444;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  margin-left: auto;
}

.btn-clear-filters:hover {
  background-color: #ef4444;
  color: white;
}

.btn-clear-filters svg {
  width: 16px;
  height: 16px;
}

.transactions-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.transactions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.transactions-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.transactions-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background-color: #f8fafc;
  border-color: #3b82f6;
}

.btn-icon svg {
  width: 18px;
  height: 18px;
  color: #64748b;
}

.transactions-table-container {
  overflow-x: auto;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th {
  background-color: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}

.transactions-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.transactions-table tr:hover {
  background-color: #f8fafc;
}

.transaction-id {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
  color: #3b82f6;
  font-weight: 500;
}

.date-time {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date {
  font-weight: 500;
  color: #1e293b;
  font-size: 0.875rem;
}

.time {
  font-size: 0.75rem;
  color: #64748b;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  font-weight: 500;
  color: #1e293b;
  font-size: 0.875rem;
}

.user-phone {
  font-size: 0.75rem;
  color: #64748b;
}

.amount {
  text-align: right;
}

.amount-value {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.currency {
  font-size: 0.75rem;
  color: #64748b;
  margin-left: 0.25rem;
}

.type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.type-badge.transfer {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.type-badge.payment {
  background-color: #dcfce7;
  color: #166534;
}

.type-badge.withdrawal {
  background-color: #fef3c7;
  color: #92400e;
}

.type-badge.deposit {
  background-color: #e0e7ff;
  color: #3730a3;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-badge.success {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.success .status-dot {
  background-color: #22c55e;
}

.status-badge.fraud {
  background-color: #fee2e2;
  color: #991b1b;
}

.status-badge.fraud .status-dot {
  background-color: #ef4444;
}

.status-badge.pending {
  background-color: #fef3c7;
  color: #92400e;
}

.status-badge.pending .status-dot {
  background-color: #f59e0b;
}

.status-badge.failed {
  background-color: #f3f4f6;
  color: #374151;
}

.status-badge.failed .status-dot {
  background-color: #6b7280;
}

.score-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.score-bar {
  width: 100px;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.score-fill.low-risk {
  background-color: #22c55e;
}

.score-fill.medium-risk {
  background-color: #f59e0b;
}

.score-fill.high-risk {
  background-color: #ef4444;
}

.score-value {
  font-size: 0.75rem;
  font-weight: 600;
}

.score-value.low-risk {
  color: #166534;
}

.score-value.medium-risk {
  color: #92400e;
}

.score-value.high-risk {
  color: #991b1b;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
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

.btn-action:hover {
  background-color: #f8fafc;
  border-color: #3b82f6;
}

.btn-action svg {
  width: 16px;
  height: 16px;
  color: #64748b;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.pagination-info {
  color: #64748b;
  font-size: 0.875rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #3b82f6;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
}

.pagination-numbers {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-number {
  width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.pagination-number:hover {
  background-color: #f8fafc;
  border-color: #3b82f6;
}

.pagination-number.active {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.pagination-dots {
  color: #64748b;
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header-actions {
    justify-content: flex-end;
  }

  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }

  .main-content-expanded {
    margin-left: 0;
  }

  .page-header {
    padding: 1.5rem;
  }

  .header-content h1 {
    font-size: 1.5rem;
  }

  .quick-stats {
    grid-template-columns: 1fr;
  }

  .filter-group {
    flex-direction: column;
  }

  .filter-item {
    min-width: auto;
  }

  .transactions-table {
    font-size: 0.8rem;
  }

  .transactions-table th,
  .transactions-table td {
    padding: 0.5rem;
  }

  .pagination {
    flex-direction: column;
    gap: 1rem;
  }

  .pagination-numbers {
    order: -1;
  }
}

@media (max-width: 480px) {
  .stat-card {
    flex-direction: column;
    text-align: center;
  }

  .user-info {
    flex-direction: column;
    text-align: center;
  }

  .pagination-controls {
    flex-direction: column;
    gap: 1rem;
  }

  .pagination-btn {
    width: 100%;
  }
}
</style>
