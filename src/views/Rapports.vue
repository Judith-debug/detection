<template>
  <div class="reports-page">
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
        <a href="#" class="nav-item">
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

        <a href="#" class="nav-item active">
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
          <h1 class="page-title">Rapports de Fraude</h1>
          <p class="page-subtitle">Analyse des transactions frauduleuses Mobile Money</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="exportReport">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Exporter
          </button>
          <button class="btn-primary" @click="generateReport">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6V4Z" stroke="currentColor" stroke-width="2"/>
              <path d="M3 10C3 9.44772 3.44772 9 4 9H20C20.5523 9 21 9.44772 21 10V12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12V10Z" stroke="currentColor" stroke-width="2"/>
              <path d="M3 16C3 15.4477 3.44772 15 4 15H20C20.5523 15 21 15.4477 21 16V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18V16Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            Générer
          </button>
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
              <option value="custom">Personnalisé</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="report-type">Type de rapport</label>
            <select id="report-type" v-model="reportType" class="filter-select">
              <option value="daily">Quotidien</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuel</option>
              <option value="custom">Personnalisé</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="fraud-type">Type de fraude</label>
            <select id="fraud-type" v-model="fraudType" class="filter-select">
              <option value="all">Tous</option>
              <option value="identity-theft">Vol d'identité</option>
              <option value="phishing">Hameçonnage</option>
              <option value="transaction-fraud">Fraude de transaction</option>
              <option value="account-takeover">Prise de contrôle de compte</option>
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

.burger-menu {
  position: fixed;
  top: 1rem;
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
