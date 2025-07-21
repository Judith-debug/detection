<template>
  <div class="dashboard-container">
   
    <nav class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <svg class="shield-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="white"/>
            <path d="M9 12L11 14L15 10" stroke="#0F7CBC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="logo-text">Fraud Stop</span>
        </div>
      </div>
      
      <div class="nav-menu">
        <a href="#" class="nav-item active">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Dashboard
        </a>
        
        <a href="#" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Transactions
        </a>
        
        <a href="#" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Alertes
        </a>
        
        <a href="#" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Rapports
        </a>
        
        <a href="#" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2579 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.01127 9.77251C4.28054 9.5799 4.48571 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Paramètres
        </a>
      </div>
      
      <div class="nav-bottom">
        <a href="#" class="nav-item logout">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Déconnexion
        </a>
      </div>
    </nav>

    
    <main class="main-content">
    
      <header class="header">
        <div class="header-right">
          <div class="notification-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="user-profile">
            <div class="user-avatar">
              <img src="c:\Users\ADMIN\Downloads\WhatsApp Image 2025-07-11 à 14.13.57_ae92db5a.jpg" alt="Judith OUEDRAOGO" />
            </div>
            <span class="user-name">Judith OUEDRAOGO</span>
          </div>
        </div>
      </header>

      
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
            <h3 class="chart-title">Répartition par type de fraude</h3>
            <div class="chart-container">
              <div class="pie-chart">
                <svg viewBox="0 0 200 200" class="pie-svg">
                  <!-- Segments du graphique en secteurs -->
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
    </main>
  </div>
</template>



<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: sans-serif;
  
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
  font-size: 2rem;
}

.nav-menu {
  flex: 1;
  padding: 1rem 0;

  
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1.5rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.356);
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
}

.nav-bottom {
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout {
  color: rgba(255, 255, 255, 0.6);
}


.main-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
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
  
  .main-content {
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