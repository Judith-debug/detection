<template>
  <div class="settings-container">
    
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <div class="logo-icon">🛡️</div>
          <h2>Fraud Stop</h2>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <button 
          v-for="section in sections" 
          :key="section.id"
          :class="['nav-item', { active: activeSection === section.id }]"
          @click="activeSection = section.id"
        >
          <span class="nav-icon">{{ section.icon }}</span>
          <span class="nav-label">{{ section.label }}</span>
        </button>
      </nav>
    </aside>

   
    <main class="main-content">
      <header class="content-header">
        <div class="header-info">
          <h1>{{ getCurrentSection().label }}</h1>
          <p>{{ getCurrentSection().description }}</p>
        </div>
        <div class="header-actions">
          <button class="btn-icon" @click="refreshSettings">
            <span>🔄</span>
          </button>
          <button class="btn-primary" @click="saveSettings">
            Enregistrer
          </button>
        </div>
      </header>

      <div v-if="activeSection === 'security'" class="settings-section">
        <div class="setting-group">
          <h3>Authentification</h3>
          <div class="settings-row">
            <div class="setting-card">
              <div class="setting-info">
                <h4>Authentification à deux facteurs</h4>
                <p>Sécurisez votre compte avec une couche supplémentaire</p>
              </div>
              <div class="setting-control">
                <label class="modern-switch">
                  <input 
                    type="checkbox" 
                    v-model="settings.security.twoFactorAuth"
                    @change="updateSetting('security', 'twoFactorAuth', $event.target.checked)"
                  >
                  <span class="switch-slider"></span>
                </label>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Verrouillage automatique</h4>
                <p>Temps d'inactivité avant verrouillage</p>
              </div>
              <div class="setting-control">
                <select 
                  v-model="settings.security.autoLock" 
                  @change="updateSetting('security', 'autoLock', $event.target.value)"
                  class="modern-select"
                >
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 heure</option>
                </select>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Tentatives de connexion</h4>
                <p>Nombre maximum avant blocage</p>
              </div>
              <div class="setting-control">
                <div class="number-input">
                  <button @click="decrementAttempts" class="number-btn">-</button>
                  <input 
                    type="number" 
                    v-model="settings.security.maxAttempts" 
                    @change="updateSetting('security', 'maxAttempts', $event.target.value)"
                    min="3" 
                    max="10"
                    class="number-field"
                  >
                  <button @click="incrementAttempts" class="number-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div v-if="activeSection === 'fraud'" class="settings-section">
        <div class="setting-group">
          <h3>Seuils de détection</h3>
          <div class="settings-row">
            <div class="setting-card full-width">
              <div class="setting-info">
                <h4>Seuil de risque élevé</h4>
                <p>Probabilité à partir de laquelle une transaction est considérée à haut risque</p>
              </div>
              <div class="setting-control">
                <div class="slider-group">
                  <input 
                    type="range" 
                    v-model="settings.fraudDetection.highRiskThreshold" 
                    @input="updateSetting('fraudDetection', 'highRiskThreshold', $event.target.value)"
                    min="0.5" 
                    max="1.0" 
                    step="0.01"
                    class="modern-slider"
                  >
                  <div class="slider-labels">
                    <span>50%</span>
                    <span class="current-value">{{ (settings.fraudDetection.highRiskThreshold * 100).toFixed(0) }}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Montant maximum</h4>
                <p>Limite en FCFA pour les transactions</p>
              </div>
              <div class="setting-control">
                <div class="amount-input">
                  <input 
                    type="text" 
                    :value="formatAmount(settings.fraudDetection.maxAmount)" 
                    @input="updateAmount($event.target.value)"
                    class="modern-input"
                    placeholder="1 000 000"
                  >
                  <span class="currency">FCFA</span>
                </div>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Analyse en temps réel</h4>
                <p>Traitement immédiat des transactions</p>
              </div>
              <div class="setting-control">
                <label class="modern-switch">
                  <input 
                    type="checkbox" 
                    v-model="settings.fraudDetection.realTimeAnalysis"
                    @change="updateSetting('fraudDetection', 'realTimeAnalysis', $event.target.checked)"
                  >
                  <span class="switch-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div v-if="activeSection === 'notifications'" class="settings-section">
        <div class="setting-group">
          <h3>Préférences de notification</h3>
          <div class="settings-row">
            <div class="setting-card">
              <div class="setting-info">
                <h4>Alertes par email</h4>
                <p>Recevoir les notifications par email</p>
              </div>
              <div class="setting-control">
                <label class="modern-switch">
                  <input 
                    type="checkbox" 
                    v-model="settings.notifications.email"
                    @change="updateSetting('notifications', 'email', $event.target.checked)"
                  >
                  <span class="switch-slider"></span>
                </label>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Notifications push</h4>
                <p>Alertes instantanées sur votre appareil</p>
              </div>
              <div class="setting-control">
                <label class="modern-switch">
                  <input 
                    type="checkbox" 
                    v-model="settings.notifications.push"
                    @change="updateSetting('notifications', 'push', $event.target.checked)"
                  >
                  <span class="switch-slider"></span>
                </label>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Fréquence des rapports</h4>
                <p>À quelle fréquence recevoir les rapports</p>
              </div>
              <div class="setting-control">
                <select 
                  v-model="settings.notifications.reportFrequency" 
                  @change="updateSetting('notifications', 'reportFrequency', $event.target.value)"
                  class="modern-select"
                >
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuel</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Section -->
      <div v-if="activeSection === 'system'" class="settings-section">
        <div class="setting-group">
          <h3>Configuration système</h3>
          <div class="settings-row">
            <div class="setting-card">
              <div class="setting-info">
                <h4>Rétention des données</h4>
                <p>Durée de conservation en jours</p>
              </div>
              <div class="setting-control">
                <div class="number-input">
                  <button @click="decrementRetention" class="number-btn">-</button>
                  <input 
                    type="number" 
                    v-model="settings.system.dataRetention" 
                    @change="updateSetting('system', 'dataRetention', $event.target.value)"
                    min="30" 
                    max="365"
                    class="number-field"
                  >
                  <button @click="incrementRetention" class="number-btn">+</button>
                </div>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Mode maintenance</h4>
                <p>Activer le mode maintenance</p>
              </div>
              <div class="setting-control">
                <label class="modern-switch">
                  <input 
                    type="checkbox" 
                    v-model="settings.system.maintenanceMode"
                    @change="updateSetting('system', 'maintenanceMode', $event.target.checked)"
                  >
                  <span class="switch-slider"></span>
                </label>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Niveau de log</h4>
                <p>Détail des journaux système</p>
              </div>
              <div class="setting-control">
                <select 
                  v-model="settings.system.logLevel" 
                  @change="updateSetting('system', 'logLevel', $event.target.value)"
                  class="modern-select"
                >
                  <option value="error">Erreur</option>
                  <option value="warn">Avertissement</option>
                  <option value="info">Information</option>
                  <option value="debug">Debug</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- API Section -->
      <div v-if="activeSection === 'api'" class="settings-section">
        <div class="setting-group">
          <h3>Configuration API</h3>
          <div class="settings-row">
            <div class="setting-card full-width">
              <div class="setting-info">
                <h4>URL API principale</h4>
                <p>Point d'entrée de l'API de détection</p>
              </div>
              <div class="setting-control">
                <input 
                  type="url" 
                  v-model="settings.api.baseUrl" 
                  @change="updateSetting('api', 'baseUrl', $event.target.value)"
                  class="modern-input"
                  placeholder="https://api.fraudguard.com"
                >
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Timeout</h4>
                <p>Délai d'attente en secondes</p>
              </div>
              <div class="setting-control">
                <div class="number-input">
                  <button @click="decrementTimeout" class="number-btn">-</button>
                  <input 
                    type="number" 
                    v-model="settings.api.timeout" 
                    @change="updateSetting('api', 'timeout', $event.target.value)"
                    min="5" 
                    max="60"
                    class="number-field"
                  >
                  <button @click="incrementTimeout" class="number-btn">+</button>
                </div>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Retry automatique</h4>
                <p>Nouvelle tentative en cas d'échec</p>
              </div>
              <div class="setting-control">
                <label class="modern-switch">
                  <input 
                    type="checkbox" 
                    v-model="settings.api.autoRetry"
                    @change="updateSetting('api', 'autoRetry', $event.target.checked)"
                  >
                  <span class="switch-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ML Section -->
      <div v-if="activeSection === 'ml'" class="settings-section">
        <div class="setting-group">
          <h3>Intelligence artificielle</h3>
          <div class="settings-row">
            <div class="setting-card">
              <div class="setting-info">
                <h4>Version du modèle</h4>
                <p>Modèle ML actuellement utilisé</p>
              </div>
              <div class="setting-control">
                <select 
                  v-model="settings.ml.modelVersion" 
                  @change="updateSetting('ml', 'modelVersion', $event.target.value)"
                  class="modern-select"
                >
                  <option value="v1.0">Version 1.0</option>
                  <option value="v1.1">Version 1.1</option>
                  <option value="v2.0">Version 2.0 (Beta)</option>
                </select>
              </div>
            </div>

            <div class="setting-card full-width">
              <div class="setting-info">
                <h4>Seuil de confiance</h4>
                <p>Niveau de certitude minimum pour les prédictions</p>
              </div>
              <div class="setting-control">
                <div class="slider-group">
                  <input 
                    type="range" 
                    v-model="settings.ml.confidenceThreshold" 
                    @input="updateSetting('ml', 'confidenceThreshold', $event.target.value)"
                    min="0.5" 
                    max="0.99" 
                    step="0.01"
                    class="modern-slider"
                  >
                  <div class="slider-labels">
                    <span>50%</span>
                    <span class="current-value">{{ (settings.ml.confidenceThreshold * 100).toFixed(0) }}%</span>
                    <span>99%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-info">
                <h4>Apprentissage adaptatif</h4>
                <p>Amélioration continue du modèle</p>
              </div>
              <div class="setting-control">
                <label class="modern-switch">
                  <input 
                    type="checkbox" 
                    v-model="settings.ml.adaptiveLearning"
                    @change="updateSetting('ml', 'adaptiveLearning', $event.target.checked)"
                  >
                  <span class="switch-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <div class="toast-container">
      <div class="toast" :class="{ show: showToast, [toastType]: true }">
        <span class="toast-icon">{{ toastIcon }}</span>
        <span class="toast-message">{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface Settings {
  security: {
    twoFactorAuth: boolean;
    autoLock: number;
    maxAttempts: number;
  };
  fraudDetection: {
    highRiskThreshold: number;
    maxAmount: number;
    realTimeAnalysis: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    reportFrequency: string;
  };
  system: {
    dataRetention: number;
    maintenanceMode: boolean;
    logLevel: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
    autoRetry: boolean;
  };
  ml: {
    modelVersion: string;
    confidenceThreshold: number;
    adaptiveLearning: boolean;
  };
}

const activeSection = ref('security')
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const toastIcon = ref('✅')

const sections = [
  { id: 'security', label: 'Sécurité', icon: '🔒', description: 'Gérez les paramètres de sécurité et d\'authentification' },
  { id: 'fraud', label: 'Détection', icon: '🎯', description: 'Configurez les seuils et règles de détection de fraude' },
  { id: 'notifications', label: 'Notifications', icon: '🔔', description: 'Personnalisez vos préférences de notification' },
  { id: 'system', label: 'Système', icon: '⚙️', description: 'Configuration générale du système' },
  { id: 'api', label: 'API', icon: '🔗', description: 'Paramètres d\'intégration et de connectivité' },
  { id: 'ml', label: 'IA', icon: '🧠', description: 'Configuration du modèle d\'intelligence artificielle' }
]

const settings = reactive<Settings>({
  security: {
    twoFactorAuth: true,
    autoLock: 15,
    maxAttempts: 5
  },
  fraudDetection: {
    highRiskThreshold: 0.85,
    maxAmount: 1000000,
    realTimeAnalysis: true
  },
  notifications: {
    email: true,
    push: true,
    reportFrequency: 'daily'
  },
  system: {
    dataRetention: 90,
    maintenanceMode: false,
    logLevel: 'info'
  },
  api: {
    baseUrl: 'https://api.fraudguard.com',
    timeout: 30,
    autoRetry: true
  },
  ml: {
    modelVersion: 'v1.1',
    confidenceThreshold: 0.8,
    adaptiveLearning: true
  }
})

const getCurrentSection = () => {
  return sections.find(s => s.id === activeSection.value) || sections[0]
}

const updateSetting = (category: string, key: string, value: any) => {
  console.log(`Updating ${category}.${key} to:`, value)
  showToastMessage('Paramètre mis à jour', 'success')
}

const saveSettings = () => {
  showToastMessage('Paramètres sauvegardés avec succès!', 'success')
  console.log('Saving settings:', settings)
}

const refreshSettings = () => {
  showToastMessage('Paramètres actualisés', 'info')
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount)
}

const updateAmount = (value: string) => {
  const numericValue = parseInt(value.replace(/\s/g, ''))
  if (!isNaN(numericValue)) {
    settings.fraudDetection.maxAmount = numericValue
    updateSetting('fraudDetection', 'maxAmount', numericValue)
  }
}

const incrementAttempts = () => {
  if (settings.security.maxAttempts < 10) {
    settings.security.maxAttempts++
    updateSetting('security', 'maxAttempts', settings.security.maxAttempts)
  }
}

const decrementAttempts = () => {
  if (settings.security.maxAttempts > 3) {
    settings.security.maxAttempts--
    updateSetting('security', 'maxAttempts', settings.security.maxAttempts)
  }
}

const incrementRetention = () => {
  if (settings.system.dataRetention < 365) {
    settings.system.dataRetention += 30
    updateSetting('system', 'dataRetention', settings.system.dataRetention)
  }
}

const decrementRetention = () => {
  if (settings.system.dataRetention > 30) {
    settings.system.dataRetention -= 30
    updateSetting('system', 'dataRetention', settings.system.dataRetention)
  }
}

const incrementTimeout = () => {
  if (settings.api.timeout < 60) {
    settings.api.timeout += 5
    updateSetting('api', 'timeout', settings.api.timeout)
  }
}

const decrementTimeout = () => {
  if (settings.api.timeout > 5) {
    settings.api.timeout -= 5
    updateSetting('api', 'timeout', settings.api.timeout)
  }
}

const showToastMessage = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  toastMessage.value = message
  toastType.value = type
  toastIcon.value = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<style scoped>
.settings-container {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%);
  color: white;
  padding: 2rem 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
}

.sidebar-header {
  padding: 0 2rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.sidebar-nav {
  padding: 0 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(4px);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-icon {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.nav-label {
  flex: 1;
  text-align: left;
}


.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  max-width: calc(100vw - 280px);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.header-info h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.header-info p {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-icon {
  width: 44px;
  height: 44px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.btn-icon:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

/* Settings Section */
.settings-section {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.setting-group {
  margin-bottom: 2rem;
}

.setting-group h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
}

.settings-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.setting-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.setting-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.setting-card.full-width {
  grid-column: 1 / -1;
}

.setting-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.setting-info p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.setting-control {
  margin-top: 1rem;
}

/* Modern Controls */
.modern-switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
}

.modern-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #cbd5e1;
  border-radius: 28px;
  transition: all 0.3s ease;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modern-switch input:checked + .switch-slider {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.modern-switch input:checked + .switch-slider:before {
  transform: translateX(24px);
}

.modern-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  font-size: 0.95rem;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modern-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.modern-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.3s ease;
}

.modern-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.number-input {
  display: flex;
  align-items: center;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  overflow: hidden;
}

.number-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #f8fafc;
  color: #64748b;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.number-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.number-field {
  flex: 1;
  border: none;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.95rem;
  color: #1e293b;
  background: white;
}

.number-field:focus {
  outline: none;
}

.amount-input {
  position: relative;
}

.currency {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.slider-group {
  width: 100%;
}

.modern-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  outline: none;
  margin-bottom: 1rem;
  cursor: pointer;
}

.modern-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
}

.modern-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #64748b;
}

.current-value {
  font-weight: 600;
  color: #3b82f6;
  background: #eff6ff;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

/* Toast */
.toast-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  transform: translateX(100%);
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.toast.show {
  transform: translateX(0);
}

.toast.success {
  background: linear-gradient(135deg, #10b981, #059669);
}

.toast.error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.toast.info {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.toast-icon {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 240px;
  }
  
  .main-content {
    margin-left: 240px;
    max-width: calc(100vw - 240px);
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .main-content {
    margin-left: 0;
    max-width: 100vw;
    padding: 1rem;
  }
  
  .content-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: flex-end;
  }
  
  .settings-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .toast-container {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
  
  .toast {
    transform: translateY(100%);
  }
  
  .toast.show {
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.5rem;
  }
  
  .setting-card {
    padding: 1rem;
  }
  
  .content-header {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }
  
  .header-info h1 {
    font-size: 1.5rem;
  }
}
</style>