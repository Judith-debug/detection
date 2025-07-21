<template>
  <div class="reports-container">
   
    <div class="reports-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="page-title">Rapports de Fraude</h1>
          <p class="page-subtitle">Analyse en temps réel des transactions Mobile Money</p>
        </div>
        <div class="header-actions">
          <select v-model="selectedPeriod" class="period-selector">
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button class="export-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1V11M8 11L11 8M8 11L5 8M2 13H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Exporter
          </button>
        </div>
      </div>
    </div>

  
    <div class="stats-grid">
      <div class="stat-card danger">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ stats.fraudDetected }}</h3>
          <p class="stat-label">Fraudes détectées</p>
          <span class="stat-change positive">+12% vs hier</span>
        </div>
      </div>

      <div class="stat-card warning">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ stats.suspicious }}</h3>
          <p class="stat-label">Transactions suspectes</p>
          <span class="stat-change negative">-5% vs hier</span>
        </div>
      </div>

      <div class="stat-card success">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ stats.legitimate }}</h3>
          <p class="stat-label">Transactions légitimes</p>
          <span class="stat-change positive">+8% vs hier</span>
        </div>
      </div>

      <div class="stat-card info">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ stats.totalAmount }}</h3>
          <p class="stat-label">Montant total analysé</p>
          <span class="stat-change positive">+15% vs hier</span>
        </div>
      </div>
    </div>

   
    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Évolution des fraudes</h3>
          <div class="chart-legend">
            <span class="legend-item fraud">Fraudes</span>
            <span class="legend-item suspicious">Suspectes</span>
          </div>
        </div>
        <div class="chart-container">
          <canvas ref="fraudTrendChart"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Types de fraude</h3>
        </div>
        <div class="chart-container">
          <canvas ref="fraudTypesChart"></canvas>
        </div>
      </div>
    </div>

  
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">Alertes récentes</h3>
        <div class="table-actions">
          <input 
            type="text" 
            placeholder="Rechercher..." 
            v-model="searchQuery"
            class="search-input"
          />
          <button class="filter-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Filtrer
          </button>
        </div>
      </div>
      <div class="table-container">
        <table class="alerts-table">
          <thead>
            <tr>
              <th>Heure</th>
              <th>Transaction ID</th>
              <th>Montant</th>
              <th>Type de fraude</th>
              <th>Risque</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alert in filteredAlerts" :key="alert.id" class="table-row">
              <td class="time-cell">{{ alert.time }}</td>
              <td class="id-cell">{{ alert.transactionId }}</td>
              <td class="amount-cell">{{ alert.amount }}</td>
              <td class="type-cell">
                <span class="fraud-type-badge" :class="alert.type">
                  {{ alert.fraudType }}
                </span>
              </td>
              <td class="risk-cell">
                <div class="risk-indicator" :class="alert.riskLevel">
                  <div class="risk-bar"></div>
                  <span class="risk-text">{{ alert.riskLevel }}</span>
                </div>
              </td>
              <td class="status-cell">
                <span class="status-badge" :class="alert.status">
                  {{ alert.statusText }}
                </span>
              </td>
              <td class="actions-cell">
                <button class="action-btn view" @click="viewDetails(alert.id)">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2C10 2 12.5 4.5 12.5 7C12.5 9.5 10 12 7 12C4 12 1.5 9.5 1.5 7C1.5 4.5 4 2 7 2Z" stroke="currentColor" stroke-width="1.2"/>
                    <circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"/>
                  </svg>
                </button>
                <button class="action-btn block" @click="blockTransaction(alert.id)">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M4.5 4.5L9.5 9.5" stroke="currentColor" stroke-width="1.2"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
)

interface Alert {
  id: string
  time: string
  transactionId: string
  amount: string
  fraudType: string
  type: string
  riskLevel: string
  status: string
  statusText: string
}

const selectedPeriod = ref('today')
const searchQuery = ref('')
const fraudTrendChart = ref<HTMLCanvasElement>()
const fraudTypesChart = ref<HTMLCanvasElement>()

const stats = ref({
  fraudDetected: '247',
  suspicious: '1,832',
  legitimate: '45,621',
  totalAmount: '2.4M FCFA'
})

const alerts = ref<Alert[]>([
  {
    id: '1',
    time: '14:32',
    transactionId: 'TXN-2024-001',
    amount: '500,000 FCFA',
    fraudType: 'Blanchiment',
    type: 'money-laundering',
    riskLevel: 'high',
    status: 'pending',
    statusText: 'En attente'
  },
  {
    id: '2',
    time: '14:28',
    transactionId: 'TXN-2024-002',
    amount: '75,000 FCFA',
    fraudType: 'Compte volé',
    type: 'account-theft',
    riskLevel: 'high',
    status: 'blocked',
    statusText: 'Bloquée'
  },
  {
    id: '3',
    time: '14:25',
    transactionId: 'TXN-2024-003',
    amount: '25,000 FCFA',
    fraudType: 'Transaction suspecte',
    type: 'suspicious',
    riskLevel: 'medium',
    status: 'investigating',
    statusText: 'Investigation'
  },
  {
    id: '4',
    time: '14:20',
    transactionId: 'TXN-2024-004',
    amount: '150,000 FCFA',
    fraudType: 'Fraude identité',
    type: 'identity-fraud',
    riskLevel: 'high',
    status: 'resolved',
    statusText: 'Résolue'
  },
  {
    id: '5',
    time: '14:15',
    transactionId: 'TXN-2024-005',
    amount: '30,000 FCFA',
    fraudType: 'Phishing',
    type: 'phishing',
    riskLevel: 'medium',
    status: 'pending',
    statusText: 'En attente'
  }
])

const filteredAlerts = computed(() => {
  if (!searchQuery.value) return alerts.value
  return alerts.value.filter(alert => 
    alert.transactionId.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    alert.fraudType.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const viewDetails = (id: string) => {
  console.log('Viewing details for:', id)
}

const blockTransaction = (id: string) => {
  console.log('Blocking transaction:', id)
}

onMounted(() => {
  // Fraud Trend Chart
  if (fraudTrendChart.value) {
    new ChartJS(fraudTrendChart.value, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [
          {
            label: 'Fraudes détectées',
            data: [12, 19, 15, 25, 22, 18, 24],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Transactions suspectes',
            data: [45, 52, 48, 61, 58, 55, 67],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(148, 163, 184, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })
  }

  // Fraud Types Chart
  if (fraudTypesChart.value) {
    new ChartJS(fraudTypesChart.value, {
      type: 'doughnut',
      data: {
        labels: ['Blanchiment', 'Compte volé', 'Fraude identité', 'Phishing', 'Autres'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            '#ef4444',
            '#f59e0b',
            '#8b5cf6',
            '#06b6d4',
            '#64748b'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    })
  }
})
</script>

<style scoped>
.reports-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
}

.reports-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.title-section h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  opacity: 0.9;
  font-size: 1rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.period-selector {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
}

.export-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-left: 4px solid;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card.danger {
  border-left-color: #ef4444;
}

.stat-card.warning {
  border-left-color: #f59e0b;
}

.stat-card.success {
  border-left-color: #10b981;
}

.stat-card.info {
  border-left-color: #3b82f6;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.danger .stat-icon {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.warning .stat-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.success .stat-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.info .stat-icon {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.stat-change {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.stat-change.positive {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.stat-change.negative {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
}

.legend-item::before {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 0.5rem;
}

.legend-item.fraud::before {
  background: #ef4444;
}

.legend-item.suspicious::before {
  background: #f59e0b;
}

.chart-container {
  height: 300px;
  position: relative;
}

.table-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.table-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.table-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  width: 200px;
}

.filter-btn {
  background: #f8fafc;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #64748b;
}

.table-container {
  overflow-x: auto;
}

.alerts-table {
  width: 100%;
  border-collapse: collapse;
}

.alerts-table th {
  background: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
}

.alerts-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.875rem;
}

.table-row:hover {
  background: #f8fafc;
}

.fraud-type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.fraud-type-badge.money-laundering {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.fraud-type-badge.account-theft {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.fraud-type-badge.suspicious {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}

.fraud-type-badge.identity-fraud {
  background: rgba(6, 182, 212, 0.1);
  color: #0891b2;
}

.fraud-type-badge.phishing {
  background: rgba(100, 116, 139, 0.1);
  color: #475569;
}

.risk-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.risk-bar {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: #e2e8f0;
  position: relative;
  overflow: hidden;
}

.risk-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 2px;
}

.risk-indicator.high .risk-bar::after {
  width: 90%;
  background: #ef4444;
}

.risk-indicator.medium .risk-bar::after {
  width: 60%;
  background: #f59e0b;
}

.risk-indicator.low .risk-bar::after {
  width: 30%;
  background: #10b981;
}

.risk-text {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.risk-indicator.high .risk-text {
  color: #dc2626;
}

.risk-indicator.medium .risk-text {
  color: #d97706;
}

.risk-indicator.low .risk-text {
  color: #059669;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.status-badge.blocked {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.status-badge.investigating {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.status-badge.resolved {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.view {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.action-btn.view:hover {
  background: rgba(59, 130, 246, 0.2);
}

.action-btn.block {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.action-btn.block:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .reports-container {
    padding: 1rem;
  }
  
  .reports-header {
    padding: 1.5rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .table-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-input {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .title-section h1 {
    font-size: 1.5rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .chart-card {
    padding: 1rem;
  }
  
  .table-header {
    padding: 1rem;
  }
  
  .alerts-table th,
  .alerts-table td {
    padding: 0.75rem 0.5rem;
  }
}
</style>