<template>

 <div class="dashboard-content">

        <div class="stats-grid">
          <div class="stat-card transactions">
            <div class="stat-header">
              <h3>Transactions totales</h3>
            </div>
            <div class="stat-value">291</div>
            <div class="stat-change positive">
              <span class="change-icon">↗</span>
              +7% vs semaine précédent
            </div>
          </div>

          <div class="stat-card frauds">
            <div class="stat-header">
              <h3>Fraudes détectées</h3>
            </div>
            <div class="stat-value">140</div>
            <div class="stat-change negative">
              <span class="change-icon">↘</span>
              -18% vs semaine précédent
            </div>
          </div>

          <div class="stat-card rate">
            <div class="stat-header">
              <h3>Taux de fraude</h3>
            </div>
            <div class="stat-value">12.1%</div>
            <div class="stat-change negative">
              <span class="change-icon">↘</span>
              -7% vs semaine précédent
            </div>
          </div>
        </div>

        <div class="charts-grid">
          <div class="chart-card">
            <h3 class="chart-title">Répartition des fraudes par région</h3>
            <div class="chart-container">
              <div class="bar-chart">
                <div class="chart-bars">
                  <div class="bar-group">
                    <div class="bar" style="height: 60%; background-color: #10B981;"></div>
                    <div class="bar" style="height: 40%; background-color: #F59E0B;"></div>
                    <div class="bar" style="height: 80%; background-color: #EF4444;"></div>
                    <span class="bar-label">OBJECTIFS</span>
                  </div>
                  <div class="bar-group">
                    <div class="bar" style="height: 45%; background-color: #10B981;"></div>
                    <div class="bar" style="height: 35%; background-color: #F59E0B;"></div>
                    <div class="bar" style="height: 70%; background-color: #EF4444;"></div>
                    <span class="bar-label">Nord</span>
                  </div>
                  <div class="bar-group">
                    <div class="bar" style="height: 55%; background-color: #10B981;"></div>
                    <div class="bar" style="height: 45%; background-color: #F59E0B;"></div>
                    <div class="bar" style="height: 85%; background-color: #EF4444;"></div>
                    <span class="bar-label">Centre</span>
                  </div>
                  <div class="bar-group">
                    <div class="bar" style="height: 70%; background-color: #10B981;"></div>
                    <div class="bar" style="height: 50%; background-color: #F59E0B;"></div>
                    <div class="bar" style="height: 90%; background-color: #EF4444;"></div>
                    <span class="bar-label">Sud</span>
                  </div>
                  <div class="bar-group">
                    <div class="bar" style="height: 40%; background-color: #10B981;"></div>
                    <div class="bar" style="height: 30%; background-color: #F59E0B;"></div>
                    <div class="bar" style="height: 60%; background-color: #EF4444;"></div>
                    <span class="bar-label">Est</span>
                  </div>
                  <div class="bar-group">
                    <div class="bar" style="height: 65%; background-color: #10B981;"></div>
                    <div class="bar" style="height: 55%; background-color: #F59E0B;"></div>
                    <div class="bar" style="height: 75%; background-color: #EF4444;"></div>
                    <span class="bar-label">Ouest</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-card">
            <h3 class="chart-title">Répartition par etat de fraude</h3>
            <div class="chart-container">
              <div class="pie-chart">
                <svg viewBox="0 0 200 200" class="pie-svg">
                
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#0F7CBC" stroke-width="40" stroke-dasharray="125.6 251.2" stroke-dashoffset="0" transform="rotate(-90 100 100)"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#F59E0B" stroke-width="40" stroke-dasharray="94.2 282.6" stroke-dashoffset="-125.6" transform="rotate(-90 100 100)"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#EF4444" stroke-width="40" stroke-dasharray="62.8 314" stroke-dashoffset="-219.8" transform="rotate(-90 100 100)"/>
                </svg>
              </div>
              <div class="pie-legend">
                <div class="legend-item">
                  <div class="legend-color" style="background-color: #0F7CBC;"></div>
                  <span>confirmée</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background-color: #F59E0B;"></div>
                  <span>faux positif</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background-color: #EF4444;"></div>
                  <span>attente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: sans-serif;
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
  white-space: nowrap;
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
  font-size: 0.9rem;
  font-weight: 500;
  color: #1e293b;
}

.dashboard-content {
  flex: 1;
  padding: 2rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
}

.stat-card.transactions {
  border-left-color: #08adfa;
}

.stat-card.frauds {
  border-left-color: #05eb5d;
}

.stat-card.rate {
  border-left-color: #05abf8;
}

.stat-header h3 {
  font-size: 1.3rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.stat-change {
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.stat-change.positive {
  color: #10B981;
}

.stat-change.negative {
  color: #EF4444;
}

.change-icon {
  font-weight: bold;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 100px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
}

.chart-bars {
  display: flex;
  gap: 1rem;
  align-items: end;
  height: 80%;
  width: 100%;
  justify-content: space-around;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}

.bar {
  width: 16px;
  margin: 0 1px;
  border-radius: 2px 2px 0 0;
  min-height: 20px;
}

.bar-label {
  font-size: 1.1rem;
  color: #64748b;
  margin-top: 0.5rem;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.pie-chart {
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
}

.pie-svg {
  width: 100%;
  height: 100%;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1rem;
  margin-left: 2rem;
  color: #64748b;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

/* Responsive Design */
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
