<template>
  <div class="transactions-page">
  
    <div v-if="showTransactionModal" class="modal-overlay" @click="closeTransactionModal">
      <div class="modal-content transaction-modal" @click.stop>
        <div class="modal-header">
          <h3>Détails de la transaction</h3>
          <button @click="closeTransactionModal" class="modal-close">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <div class="modal-body" v-if="selectedTransaction">
          <div class="transaction-details">
            <div class="detail-section">
              <h4>Informations générales</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="label">ID Transaction:</span>
                  <span class="value">{{ selectedTransaction.id }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Date:</span>
                  <span class="value">{{ formatDate(selectedTransaction.date) }} {{ formatTime(selectedTransaction.date) }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Montant:</span>
                  <span class="value">{{ formatAmount(selectedTransaction.amount) }} FCFA</span>
                </div>
                <div class="detail-item">
                  <span class="label">Type:</span>
                  <span class="value">{{ getTypeLabel(selectedTransaction.type) }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Statut:</span>
                  <span class="value">{{ getStatusLabel(selectedTransaction.status) }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Score de fraude:</span>
                  <span class="value" :class="getScoreClass(selectedTransaction.fraudScore)">{{ selectedTransaction.fraudScore }}%</span>
                </div>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>Expéditeur</h4>
              <div class="user-detail">
                <div class="user-avatar large">{{ getInitials(selectedTransaction.sender.name) }}</div>
                <div class="user-info-detail">
                  <p class="user-name">{{ selectedTransaction.sender.name }}</p>
                  <p class="user-phone">{{ selectedTransaction.sender.phone }}</p>
                </div>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>Destinataire</h4>
              <div class="user-detail">
                <div class="user-avatar large">{{ getInitials(selectedTransaction.receiver.name) }}</div>
                <div class="user-info-detail">
                  <p class="user-name">{{ selectedTransaction.receiver.name }}</p>
                  <p class="user-phone">{{ selectedTransaction.receiver.phone }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeTransactionModal" class="btn-cancel">Fermer</button>
          <button v-if="selectedTransaction && selectedTransaction.status !== 'fraud'" 
                  @click="markAsFraud" class="btn-fraud">Marquer comme fraude</button>
        </div>
      </div>
    </div>
    <div v-if="showFraudModal" class="modal-overlay" @click="closeFraudModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Confirmer la fraude</h3>
          <button @click="closeFraudModal" class="modal-close">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir marquer cette transaction comme frauduleuse ?</p>
          <div class="fraud-reason">
            <label for="fraudReason">Raison de la fraude:</label>
            <select v-model="fraudReason" id="fraudReason" class="fraud-select">
              <option value="">Sélectionner une raison</option>
              <option value="suspicious-amount">Montant suspect</option>
              <option value="velocity">Vitesse anormale</option>
              <option value="geo-location">Localisation suspecte</option>
              <option value="pattern">Motif inhabituel</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeFraudModal" class="btn-cancel">Annuler</button>
          <button @click="confirmFraud" class="btn-confirm">Confirmer</button>
        </div>
      </div>
    </div>

    <!-- Header de la page -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Transactions Mobile Money</h1>
        <p class="page-subtitle">Surveillance et détection automatique de fraude</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="exportData">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Exporter
        </button>
        <button class="btn-primary" @click="toggleFilters">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6V4Z" stroke="currentColor" stroke-width="2"/>
            <path d="M3 10C3 9.44772 3.44772 9 4 9H20C20.5523 9 21 9.44772 21 10V12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12V10Z" stroke="currentColor" stroke-width="2"/>
            <path d="M3 16C3 15.4477 3.44772 15 4 15H20C20.5523 15 21 15.4477 21 16V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18V16Z" stroke="currentColor" stroke-width="2"/>
          </svg>
          Filtrer
        </button>
      </div>
    </div>

    <!-- Statistiques rapides -->
    <div class="quick-stats">
      <div class="stat-item">
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
      
      <div class="stat-item">
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
      
      <div class="stat-item">
        <div class="stat-icon amount">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-value">2.4M</span>
          <span class="stat-label">Volume total (FCFA)</span>
        </div>
      </div>
      
      <div class="stat-item">
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

    <!-- Filtres et recherche -->
    <div class="filters-section" :class="{ expanded: showFilters }">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input type="text" v-model="searchQuery" placeholder="Rechercher par ID, téléphone, montant..." class="search-input" @input="filterTransactions">
      </div>
      
      <div class="filter-buttons">
        <select v-model="statusFilter" class="filter-select" @change="filterTransactions">
          <option value="">Tous les statuts</option>
          <option value="success">Réussie</option>
          <option value="fraud">Fraude détectée</option>
          <option value="pending">En attente</option>
          <option value="failed">Échouée</option>
        </select>
        
        <select v-model="typeFilter" class="filter-select" @change="filterTransactions">
          <option value="">Type de transaction</option>
          <option value="transfer">Transfert</option>
          <option value="payment">Paiement</option>
          <option value="withdrawal">Retrait</option>
          <option value="deposit">Dépôt</option>
        </select>
        
        <input type="date" class="filter-date" v-model="dateFilter" @change="filterTransactions">
        
        <button @click="clearFilters" class="btn-clear-filters">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
          </svg>
          Effacer
        </button>
      </div>
    </div>

    <!-- Tableau des transactions -->
    <div class="transactions-table-container">
      <div class="table-header">
        <h2>Transactions récentes</h2>
        <div class="table-actions">
          <button class="btn-icon" title="Actualiser" @click="refreshTransactions">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4V10H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.49 9C19.9828 7.56678 19.1209 6.28392 17.9845 5.27304C16.8482 4.26216 15.4745 3.55691 13.9917 3.21834C12.5089 2.87977 10.9652 2.91902 9.50481 3.33311C8.04437 3.74721 6.70475 4.52334 5.60999 5.59" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.51001 15C4.01716 16.4332 4.87906 17.7161 6.01543 18.727C7.1518 19.7378 8.52547 20.4431 10.0083 20.7817C11.4911 21.1202 13.0348 21.081 14.4952 20.6669C15.9556 20.2528 17.2953 19.4767 18.39 18.41" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="table-wrapper">
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
            <tr v-for="transaction in filteredTransactions" :key="transaction.id" :class="getRowClass(transaction.status)">
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
                <span class="type-badge" :class="transaction.type">{{ getTypeLabel(transaction.type) }}</span>
              </td>
              <td class="status">
                <span class="status-badge" :class="transaction.status">
                  <span class="status-dot"></span>
                  {{ getStatusLabel(transaction.status) }}
                </span>
              </td>
              <td class="fraud-score">
                <div class="score-container">
                  <div class="score-bar">
                    <div class="score-fill" :style="{ width: transaction.fraudScore + '%' }" :class="getScoreClass(transaction.fraudScore)"></div>
                  </div>
                  <span class="score-value" :class="getScoreClass(transaction.fraudScore)">{{ transaction.fraudScore }}%</span>
                </div>
              </td>
              <td class="actions">
                <div class="action-buttons">
                  <button class="btn-action" title="Voir détails" @click="viewTransaction(transaction)">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </button>
                  <button class="btn-action" title="Marquer comme fraude" v-if="transaction.status !== 'fraud'" @click="openFraudModal(transaction)">
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
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <div class="pagination-info">
        Affichage de {{ startIndex }} à {{ endIndex }} sur {{ totalTransactions }} transactions
      </div>
      <div class="pagination-controls">
        <button class="pagination-btn" :disabled="currentPageNum === 1" @click="previousPage">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Précédent
        </button>
        <div class="pagination-numbers">
          <button v-for="page in visiblePages" :key="page" 
                  :class="['pagination-number', { active: page === currentPageNum }]"
                  @click="goToPage(page)">
            {{ page }}
          </button>
        </div>
        <button class="pagination-btn" :disabled="currentPageNum === totalPages" @click="nextPage">
          Suivant
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface User {
  name: string
  phone: string
}

interface Transaction {
  id: string
  date: string
  sender: User
  receiver: User
  amount: number
  type: 'transfer' | 'payment' | 'withdrawal' | 'deposit'
  status: 'success' | 'fraud' | 'pending' | 'failed'
  fraudScore: number
}

const showTransactionModal = ref(false)
const showFraudModal = ref(false)
const selectedTransaction = ref<Transaction | null>(null)
const fraudReason = ref('')
const showFilters = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const dateFilter = ref('')
const currentPageNum = ref(1)
const itemsPerPage = 20

const allTransactions = ref<Transaction[]>([
  {
    id: 'TXN-2024-001247',
    date: '2024-01-15T14:30:25',
    sender: { name: 'Amadou TRAORE', phone: '+226 70 12 34 56' },
    receiver: { name: 'Fatima OUEDRAOGO', phone: '+226 75 98 76 54' },
    amount: 50000,
    type: 'transfer',
    status: 'success',
    fraudScore: 15
  },
  {
    id: 'TXN-2024-001246',
    date: '2024-01-15T14:28:12',
    sender: { name: 'Ibrahim KONE', phone: '+226 78 45 67 89' },
    receiver: { name: 'Mariam SAWADOGO', phone: '+226 76 23 45 67' },
    amount: 125000,
    type: 'payment',
    status: 'fraud',
    fraudScore: 87
  },
  {
    id: 'TXN-2024-001245',
    date: '2024-01-15T14:25:45',
    sender: { name: 'Salif DIALLO', phone: '+226 72 11 22 33' },
    receiver: { name: 'Aissata COMPAORE', phone: '+226 77 44 55 66' },
    amount: 25000,
    type: 'withdrawal',
    status: 'pending',
    fraudScore: 42
  },
  {
    id: 'TXN-2024-001244',
    date: '2024-01-15T14:22:18',
    sender: { name: 'Boukary OUATTARA', phone: '+226 79 87 65 43' },
    receiver: { name: 'Rasmata ZONGO', phone: '+226 74 12 98 76' },
    amount: 75000,
    type: 'deposit',
    status: 'success',
    fraudScore: 8
  },
  {
    id: 'TXN-2024-001243',
    date: '2024-01-15T14:20:33',
    sender: { name: 'Moussa KABORE', phone: '+226 71 33 44 55' },
    receiver: { name: 'Aminata BARRY', phone: '+226 73 66 77 88' },
    amount: 200000,
    type: 'transfer',
    status: 'fraud',
    fraudScore: 92
  }
  // Ajouter plus de transactions pour la pagination
])

const transactions = ref<Transaction[]>([...allTransactions.value])

const filteredTransactions = computed(() => {
  let filtered = [...transactions.value]
  
  // Filtrage par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(t => 
      t.id.toLowerCase().includes(query) ||
      t.sender.name.toLowerCase().includes(query) ||
      t.sender.phone.includes(query) ||
      t.receiver.name.toLowerCase().includes(query) ||
      t.receiver.phone.includes(query) ||
      t.amount.toString().includes(query)
    )
  }
  
  // Filtrage par statut
  if (statusFilter.value) {
    filtered = filtered.filter(t => t.status === statusFilter.value)
  }
  
  // Filtrage par type
  if (typeFilter.value) {
    filtered = filtered.filter(t => t.type === typeFilter.value)
  }
  
  // Filtrage par date
  if (dateFilter.value) {
    filtered = filtered.filter(t => {
      const transactionDate = new Date(t.date).toISOString().split('T')[0]
      return transactionDate === dateFilter.value
    })
  }
  
  // Pagination
  const start = (currentPageNum.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalTransactions = computed(() => transactions.value.length)
const totalPages = computed(() => Math.ceil(totalTransactions.value / itemsPerPage))
const startIndex = computed(() => (currentPageNum.value - 1) * itemsPerPage + 1)
const endIndex = computed(() => Math.min(currentPageNum.value * itemsPerPage, totalTransactions.value))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPageNum.value - 2)
  const end = Math.min(totalPages.value, currentPageNum.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const filterTransactions = () => {
  currentPageNum.value = 1 // Reset à la première page lors du filtrage
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  typeFilter.value = ''
  dateFilter.value = ''
  currentPageNum.value = 1
}

const refreshTransactions = () => {
  // Simulation du rechargement des données
  console.log('Actualisation des transactions...')
  // Ici vous pourriez faire un appel API
}

const exportData = () => {
  // Simulation de l'export
  console.log('Export des données...')
  const csvContent = "data:text/csv;charset=utf-8," 
    + "ID,Date,Expéditeur,Destinataire,Montant,Type,Statut,Score\n"
    + transactions.value.map(t => 
        `${t.id},${t.date},${t.sender.name},${t.receiver.name},${t.amount},${t.type},${t.status},${t.fraudScore}`
      ).join("\n")
  
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "transactions.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const viewTransaction = (transaction: Transaction) => {
  selectedTransaction.value = transaction
  showTransactionModal.value = true
}

const closeTransactionModal = () => {
  showTransactionModal.value = false
  selectedTransaction.value = null
}

const openFraudModal = (transaction: Transaction) => {
  selectedTransaction.value = transaction
  showFraudModal.value = true
}

const closeFraudModal = () => {
  showFraudModal.value = false
  fraudReason.value = ''
}

const markAsFraud = () => {
  showTransactionModal.value = false
  showFraudModal.value = true
}

const confirmFraud = () => {
  if (selectedTransaction.value && fraudReason.value) {
    // Mettre à jour le statut de la transaction
    const index = transactions.value.findIndex(t => t.id === selectedTransaction.value!.id)
    if (index !== -1) {
      transactions.value[index].status = 'fraud'
      transactions.value[index].fraudScore = 95
    }
    
    console.log(`Transaction ${selectedTransaction.value.id} marquée comme fraude. Raison: ${fraudReason.value}`)
    closeFraudModal()
    selectedTransaction.value = null
  }
}

const previousPage = () => {
  if (currentPageNum.value > 1) {
    currentPageNum.value--
  }
}

const nextPage = () => {
  if (currentPageNum.value < totalPages.value) {
    currentPageNum.value++
  }
}

const goToPage = (page: number) => {
  currentPageNum.value = page
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount)
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getTypeLabel = (type: string) => {
  const labels = {
    transfer: 'Transfert',
    payment: 'Paiement',
    withdrawal: 'Retrait',
    deposit: 'Dépôt'
  }
  return labels[type as keyof typeof labels] || type
}

const getStatusLabel = (status: string) => {
  const labels = {
    success: 'Réussie',
    fraud: 'Fraude',
    pending: 'En attente',
    failed: 'Échouée'
  }
  return labels[status as keyof typeof labels] || status
}

const getRowClass = (status: string) => {
  return `row-${status}`
}

const getScoreClass = (score: number) => {
  if (score >= 70) return 'high-risk'
  if (score >= 40) return 'medium-risk'
  return 'low-risk'
}

onMounted(() => {
  // Initialisation des données
  // Générer plus de transactions pour la démonstration
  for (let i = 6; i <= 100; i++) {
    allTransactions.value.push({
      id: `TXN-2024-${String(i).padStart(6, '0')}`,
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      sender: { 
        name: `Utilisateur ${i}`, 
        phone: `+226 ${Math.floor(Math.random() * 90000000) + 10000000}` 
      },
      receiver: { 
        name: `Destinataire ${i}`, 
        phone: `+226 ${Math.floor(Math.random() * 90000000) + 10000000}` 
      },
      amount: Math.floor(Math.random() * 500000) + 10000,
      type: ['transfer', 'payment', 'withdrawal', 'deposit'][Math.floor(Math.random() * 4)] as any,
      status: ['success', 'fraud', 'pending', 'failed'][Math.floor(Math.random() * 4)] as any,
      fraudScore: Math.floor(Math.random() * 100)
    })
  }
  transactions.value = [...allTransactions.value]
})
</script>

<style scoped>
.transactions-page {
  padding: 2rem;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: sans-serif;
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
  font-size: 3rem;
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

/* Statistiques rapides */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-item {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
}

.stat-item:hover {
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
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

/* Section des filtres */
.filters-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #64748b;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-select, .filter-date {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.filter-select:focus, .filter-date:focus {
  outline: none;
  border-color: #3b82f6;
}

/* Conteneur du tableau */
.transactions-table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.table-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.table-actions {
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

/* Tableau */
.table-wrapper {
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

.row-fraud {
  background-color: #fef2f2;
}

.row-fraud:hover {
  background-color: #fee2e2;
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
  width: 60px;
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

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
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
  width: 14px;
  height: 14px;
  color: #64748b;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

/* Modales */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
}

.transaction-modal {
  max-width: 600px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.modal-close:hover {
  background-color: #f1f5f9;
}

.modal-close svg {
  width: 18px;
  height: 18px;
  color: #64748b;
}

.modal-body {
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.transaction-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item .label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.detail-item .value {
  font-size: 0.875rem;
  color: #1e293b;
  font-weight: 500;
}

.user-detail {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar.large {
  width: 48px;
  height: 48px;
  font-size: 1rem;
}

.user-info-detail {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-info-detail .user-name {
  font-weight: 600;
  color: #1e293b;
}

.user-info-detail .user-phone {
  color: #64748b;
  font-size: 0.875rem;
}

.fraud-reason {
  margin-top: 1rem;
}

.fraud-reason label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.fraud-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  justify-content: flex-end;
}

.btn-cancel, .btn-confirm, .btn-fraud {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel {
  border: 1px solid #e2e8f0;
  background: white;
  color: #374151;
}

.btn-cancel:hover {
  background-color: #f9fafb;
}

.btn-confirm {
  border: 1px solid #ef4444;
  background: #ef4444;
  color: white;
}

.btn-confirm:hover {
  background-color: #dc2626;
}

.btn-fraud {
  border: 1px solid #f59e0b;
  background: #f59e0b;
  color: white;
}

.btn-fraud:hover {
  background-color: #d97706;
}

/* Filtres étendus */
.filters-section.expanded {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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
}

.btn-clear-filters:hover {
  background-color: #ef4444;
  color: white;
}

.btn-clear-filters svg {
  width: 16px;
  height: 16px;
}

/* Responsive Design */
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
  .transactions-page {
    padding: 1rem;
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
  
  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .filter-buttons {
    justify-content: stretch;
  }
  
  .filter-select, .filter-date {
    flex: 1;
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
  .stat-item {
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
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    margin: 1rem;
    width: calc(100% - 2rem);
  }
}
</style>