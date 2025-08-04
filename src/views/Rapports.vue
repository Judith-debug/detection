<template>
  <div class="reports-page">
    <div class="main-content" :class="{ 'main-content-expanded': isSidebarCollapsed }">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Rapports de Fraude</h1>
          <p class="page-subtitle">Analyse des transactions frauduleuses Mobile Money</p>
        </div>
        
      </div>

      <div class="report-summary">
        <div class="summary-card">
          <div class="summary-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="summary-content">
            <span class="summary-value">{{ totalFraudReports }}</span>
            <span class="summary-label">Rapports de fraude</span>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 19.9999 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="summary-content">
            <span class="summary-value">{{ formatAmount(totalFraudAmount) }}</span>
            <span class="summary-label">Montant total fraudé</span>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="summary-content">
            <span class="summary-value">{{ fraudDetectionRate }}%</span>
            <span class="summary-label">Taux de détection</span>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" stroke="currentColor" stroke-width="2"/>
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="summary-content">
            <span class="summary-value">{{ averageResponseTime }} min</span>
            <span class="summary-label">Temps de réponse moyen</span>
          </div>
        </div>
      </div>

      <div class="report-filters">
        <div class="filter-group">
          <div class="filter-item">
            <label for="date-range">Période</label>
            <select id="date-range" v-model="dateRange" class="filter-select">
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
              
            </select>
          </div>

          <div class="filter-item">
            <label for="report-type">Type de rapport</label>
            <select id="report-type" v-model="reportType" class="filter-select">
              <option value="daily">Quotidien</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuel</option>

            </select>
          </div>

          <div class="filter-item">
            <label for="fraud-type">Etat de fraude</label>
            <select id="fraud-type" v-model="fraudType" class="filter-select">
             
              <option value="identity-theft"> en entente</option>
              <option value="phishing">Confirmée</option>
              <option value="transaction-fraud">faux positif</option>
           
            </select>
          </div>

          <button class="btn-clear-filters" @click="clearFilters">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
            </svg>
            Effacer les filtres
          </button>
        </div>
      </div>

      <div class="report-charts">
        <div class="chart-container">
          <div class="chart-header">
            <h3>Tendances des fraudes</h3>
            <div class="chart-actions">
              <button class="chart-action" @click="changeChartView('day')">Jour</button>
              <button class="chart-action" @click="changeChartView('week')">Semaine</button>
              <button class="chart-action active" @click="changeChartView('month')">Mois</button>
              <button class="chart-action" @click="changeChartView('year')">Année</button>
            </div>
          </div>
          <div class="chart-content">
            <canvas id="fraudTrendsChart"></canvas>
          </div>
        </div>

        <div class="chart-container">
          <div class="chart-header">
            <h3>Types de fraudes</h3>
          </div>
          <div class="chart-content">
            <canvas id="fraudTypesChart"></canvas>
          </div>
        </div>
      </div>

      <div class="report-table">
        <div class="table-header">
          <h3>Rapports récents</h3>
          <div class="table-actions">
            <button class="btn-icon" @click="refreshTable">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4V10H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.49 9C19.9828 7.56678 19.1209 6.28392 17.9845 5.27304C16.8482 4.26216 15.4745 3.55691 13.9917 3.21834C12.5089 2.87977 10.9652 2.91902 9.50481 3.33311C8.04437 3.74721 6.70475 4.52334 5.60999 5.59" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.51001 15C4.01716 16.4332 4.87906 17.7161 6.01543 18.727C7.1518 19.7378 8.52547 20.4431 10.0083 20.7817C11.4911 21.1202 13.0348 21.081 14.4952 20.6669C15.9556 20.2528 17.2953 19.4767 18.39 18.41" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="table-content">
          <table>
            <thead>
              <tr>
                <th>ID Rapport</th>
                <th>Date</th>
                <th>Type de Fraude</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Score de Risque</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="report in paginatedReports" :key="report.id">
                <td>{{ report.id }}</td>
                <td>{{ formatDate(report.date) }}</td>
                <td>{{ formatFraudType(report.fraudType) }}</td>
                <td>{{ formatAmount(report.amount) }}</td>
                <td>
                  <span class="status-badge" :class="report.status">
                    {{ formatStatus(report.status) }}
                  </span>
                </td>
                <td>
                  <div class="risk-meter">
                    <div class="risk-level" :style="{ width: report.riskScore + '%' }" :class="getRiskClass(report.riskScore)"></div>
                  </div>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-action" title="Voir détails" @click="viewDetails(report)">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </button>
                    <button class="btn-action" title="Télécharger PDF" @click="downloadPDF(report)">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
            Affichage de {{ currentPage * itemsPerPage - itemsPerPage + 1 }} à {{ Math.min(currentPage * itemsPerPage, totalReports) }} sur {{ totalReports }} rapports
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
import { ref, computed, onMounted } from 'vue'
import Chart from 'chart.js/auto'

interface FraudReport {
  id: string
  date: Date
  fraudType: string
  amount: number
  status: string
  riskScore: number
}

const isSidebarCollapsed = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10
const dateRange = ref('month')
const reportType = ref('monthly')
const fraudType = ref('all')

const reports = ref<FraudReport[]>([
  {
    id: 'FR-2024-001',
    date: new Date('2024-01-15'),
    fraudType: 'identity-theft',
    amount: 50000,
    status: 'resolved',
    riskScore: 85
  },
  {
    id: 'FR-2024-002',
    date: new Date('2024-01-14'),
    fraudType: 'phishing',
    amount: 25000,
    status: 'investigating',
    riskScore: 75
  },
  {
    id: 'FR-2024-003',
    date: new Date('2024-01-13'),
    fraudType: 'transaction-fraud',
    amount: 75000,
    status: 'resolved',
    riskScore: 90
  },
  {
    id: 'FR-2024-004',
    date: new Date('2024-01-12'),
    fraudType: 'account-takeover',
    amount: 15000,
    status: 'resolved',
    riskScore: 65
  },
  {
    id: 'FR-2024-005',
    date: new Date('2024-01-11'),
    fraudType: 'identity-theft',
    amount: 100000,
    status: 'investigating',
    riskScore: 95
  },
  {
    id: 'FR-2024-006',
    date: new Date('2024-01-10'),
    fraudType: 'phishing',
    amount: 35000,
    status: 'resolved',
    riskScore: 70
  },
  {
    id: 'FR-2024-007',
    date: new Date('2024-01-09'),
    fraudType: 'transaction-fraud',
    amount: 60000,
    status: 'resolved',
    riskScore: 80
  },
  {
    id: 'FR-2024-008',
    date: new Date('2024-01-08'),
    fraudType: 'account-takeover',
    amount: 20000,
    status: 'investigating',
    riskScore: 85
  },
  {
    id: 'FR-2024-009',
    date: new Date('2024-01-07'),
    fraudType: 'identity-theft',
    amount: 45000,
    status: 'resolved',
    riskScore: 75
  },
  {
    id: 'FR-2024-010',
    date: new Date('2024-01-06'),
    fraudType: 'phishing',
    amount: 80000,
    status: 'resolved',
    riskScore: 90
  },
  {
    id: 'FR-2024-011',
    date: new Date('2024-01-05'),
    fraudType: 'transaction-fraud',
    amount: 30000,
    status: 'investigating',
    riskScore: 70
  },
  {
    id: 'FR-2024-012',
    date: new Date('2024-01-04'),
    fraudType: 'account-takeover',
    amount: 55000,
    status: 'resolved',
    riskScore: 85
  }
])

const totalFraudReports = computed(() => reports.value.length)
const totalFraudAmount = computed(() => reports.value.reduce((sum, report) => sum + report.amount, 0))
const fraudDetectionRate = ref(92.5)
const averageResponseTime = ref(18)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const exportReport = () => {
  alert('Export du rapport')
}

const generateReport = () => {
  alert('Génération du rapport')
}

const clearFilters = () => {
  dateRange.value = 'month'
  reportType.value = 'monthly'
  fraudType.value = 'all'
}

const viewDetails = (report: FraudReport) => {
  alert(`Détails du rapport ${report.id}`)
}

const downloadPDF = (report: FraudReport) => {
  alert(`Téléchargement du PDF pour le rapport ${report.id}`)
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR')
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount)
}

const formatFraudType = (type: string) => {
  const types: Record<string, string> = {
    'identity-theft': 'Vol d\'identité',
    'phishing': 'Hameçonnage',
    'transaction-fraud': 'Fraude de transaction',
    'account-takeover': 'Prise de contrôle de compte'
  }
  return types[type] || type
}

const formatStatus = (status: string) => {
  const statuses: Record<string, string> = {
    resolved: 'Résolu',
    investigating: 'En investigation',
    pending: 'En attente'
  }
  return statuses[status] || status
}

const getRiskClass = (score: number) => {
  if (score < 30) return 'low-risk'
  if (score < 70) return 'medium-risk'
  return 'high-risk'
}

const filteredReports = computed(() => {
  return reports.value
    .filter(report => fraudType.value === 'all' || report.fraudType === fraudType.value)
})

const totalReports = computed(() => filteredReports.value.length)
const totalPages = computed(() => Math.ceil(totalReports.value / itemsPerPage.value))

const visiblePages = computed(() => {
  const pages = []
  const startPage = Math.max(1, currentPage.value - 2)
  const endPage = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

const paginatedReports = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredReports.value.slice(start, end)
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

const changeChartView = (view: string) => {
  alert(`Changement de vue du graphique à ${view}`)
}

const refreshTable = () => {
  alert('Actualisation du tableau')
}

onMounted(() => {
  // Initialisation des graphiques
  const fraudTrendsCtx = document.getElementById('fraudTrendsChart') as HTMLCanvasElement
  const fraudTypesCtx = document.getElementById('fraudTypesChart') as HTMLCanvasElement

  if (fraudTrendsCtx) {
    new Chart(fraudTrendsCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{
          label: 'Tendances des fraudes',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    })
  }

  if (fraudTypesCtx) {
    new Chart(fraudTypesCtx, {
      type: 'doughnut',
      data: {
        labels: ['Vol d\'identité', 'Hameçonnage', 'Fraude de transaction', 'Prise de contrôle de compte'],
        datasets: [{
          data: [30, 25, 20, 25],
          backgroundColor: [
            '#3b82f6',
            '#1e40af',
            '#6366f1',
            '#9333ea'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          }
        }
      }
    })
  }
})
</script>

<style scoped>
.reports-page {
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9;
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
  margin-left: -10px;
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

.report-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.summary-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.summary-icon svg {
  width: 24px;
  height: 24px;
}

.summary-content {
  display: flex;
  flex-direction: column;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.summary-label {
  font-size: 0.875rem;
  color: #64748b;
}

.report-filters {
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
  align-items: flex-end;
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

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
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

.report-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-container {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.chart-actions {
  display: flex;
  gap: 0.5rem;
}

.chart-action {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.chart-action:hover, .chart-action.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.chart-content {
  position: relative;
  height: 300px;
}

.report-table {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.table-header h3 {
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

.table-content {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

tr:hover {
  background-color: #f8fafc;
}

.status-badge {
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.resolved {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.investigating {
  background-color: #fef3c7;
  color: #92400e;
}

.status-badge.pending {
  background-color: #fee2e2;
  color: #991b1b;
}

.risk-meter {
  width: 100px;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.risk-level {
  height: 100%;
  border-radius: 3px;
}

.risk-level.low-risk {
  background-color: #22c55e;
}

.risk-level.medium-risk {
  background-color: #f59e0b;
}

.risk-level.high-risk {
  background-color: #ef4444;
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

  .report-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .report-charts {
    grid-template-columns: 1fr;
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

  .report-summary {
    grid-template-columns: 1fr;
  }

  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-item {
    min-width: auto;
  }

  .filter-select {
    width: 100%;
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
  .summary-card {
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
