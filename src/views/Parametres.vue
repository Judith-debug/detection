<template>
  <div class="settings-page">
    <div class="main-content" :class="{ 'main-content-expanded': isSidebarCollapsed, 'main-content-pushed': isPushed }">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Paramètres</h1>
          <p class="page-subtitle">Gérez les paramètres de votre application de détection de fraude</p>
        </div>
      </div>
      <div class="settings-container">
        <div class="settings-tabs">
          <div class="tabs-header">
            <button class="tab-button" :class="{ 'active': activeTab === 'general' }" @click="activeTab = 'general'">
              Général
            </button>
            <button class="tab-button" :class="{ 'active': activeTab === 'notifications' }" @click="activeTab = 'notifications'">
              Notifications
            </button>
            <button class="tab-button" :class="{ 'active': activeTab === 'security' }" @click="activeTab = 'security'">
              Sécurité
            </button>
            <button class="tab-button" :class="{ 'active': activeTab === 'fraud-rules' }" @click="activeTab = 'fraud-rules'">
              Règles de fraude
            </button>
          </div>
          <div class="tabs-content">
            <div class="tab-pane" v-if="activeTab === 'general'">
              <h2>Paramètres généraux</h2>
              <div class="settings-form">
                <div class="form-group">
                  <label for="app-name">Nom de l'application</label>
                  <input type="text" id="app-name" v-model="appName" class="form-input">
                </div>
                <div class="form-group">
                  <label for="language">Langue</label>
                  <select id="language" v-model="language" class="form-select">
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="timezone">Fuseau horaire</label>
                  <select id="timezone" v-model="timezone" class="form-select">
                    <option value="GMT+1">GMT+1 (Africa/Abidjan)</option>
                    <option value="GMT">GMT (Africa/Accra)</option>
                    <option value="GMT+2">GMT+2 (Africa/Cairo)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="currency">Devise</label>
                  <select id="currency" v-model="currency" class="form-select">
                    <option value="XOF">FCFA (XOF)</option>
                    <option value="USD">Dollar américain (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
                <button class="save-button">Enregistrer les modifications</button>
              </div>
            </div>
            <div class="tab-pane" v-if="activeTab === 'notifications'">
              <h2>Paramètres de notification</h2>
              <div class="settings-form">
                <div class="form-group">
                  <label for="email-notifications">Notifications par e-mail</label>
                  <div class="toggle-switch">
                    <input type="checkbox" id="email-notifications" v-model="emailNotifications" class="toggle-input">
                    <label for="email-notifications" class="toggle-label"></label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="sms-notifications">Notifications par SMS</label>
                  <div class="toggle-switch">
                    <input type="checkbox" id="sms-notifications" v-model="smsNotifications" class="toggle-input">
                    <label for="sms-notifications" class="toggle-label"></label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="push-notifications">Notifications push</label>
                  <div class="toggle-switch">
                    <input type="checkbox" id="push-notifications" v-model="pushNotifications" class="toggle-input">
                    <label for="push-notifications" class="toggle-label"></label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="notification-frequency">Fréquence des notifications</label>
                  <select id="notification-frequency" v-model="notificationFrequency" class="form-select">
                    <option value="realtime">En temps réel</option>
                    <option value="hourly">Heure par heure</option>
                    <option value="daily">Quotidien</option>
                  </select>
                </div>
                <button class="save-button">Enregistrer les modifications</button>
              </div>
            </div>
            <div class="tab-pane" v-if="activeTab === 'security'">
              <h2>Paramètres de sécurité</h2>
              <div class="settings-form">
                <div class="form-group">
                  <label for="password">Changer le mot de passe</label>
                  <input type="password" id="password" placeholder="Nouveau mot de passe" class="form-input">
                </div>
                <div class="form-group">
                  <label for="confirm-password">Confirmer le mot de passe</label>
                  <input type="password" id="confirm-password" placeholder="Confirmer le mot de passe" class="form-input">
                </div>
                <div class="form-group">
                  <label for="session-timeout">Délai d'expiration de la session</label>
                  <select id="session-timeout" v-model="sessionTimeout" class="form-select">
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 heure</option>
                    <option value="120">2 heures</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="2fa">Authentification à deux facteurs</label>
                  <div class="toggle-switch">
                    <input type="checkbox" id="2fa" v-model="twoFactorAuth" class="toggle-input">
                    <label for="2fa" class="toggle-label"></label>
                  </div>
                </div>
                <button class="save-button">Enregistrer les modifications</button>
              </div>
            </div>
            <div class="tab-pane" v-if="activeTab === 'fraud-rules'">
              <h2>Règles de détection de fraude</h2>
              <div class="settings-form">
                <div class="form-group">
                  <label for="transaction-limit">Limite de transaction</label>
                  <input type="number" id="transaction-limit" v-model="transactionLimit" class="form-input">
                  <span class="input-unit">FCFA</span>
                </div>
                <div class="form-group">
                  <label for="transaction-velocity">Vitesse de transaction</label>
                  <input type="number" id="transaction-velocity" v-model="transactionVelocity" class="form-input">
                  <span class="input-unit">transactions/minute</span>
                </div>
                <div class="form-group">
                  <label for="geolocation">Vérification géolocalisation</label>
                  <div class="toggle-switch">
                    <input type="checkbox" id="geolocation" v-model="geolocationCheck" class="toggle-input">
                    <label for="geolocation" class="toggle-label"></label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="ip-check">Vérification IP</label>
                  <div class="toggle-switch">
                    <input type="checkbox" id="ip-check" v-model="ipCheck" class="toggle-input">
                    <label for="ip-check" class="toggle-label"></label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="device-fingerprinting">Device Fingerprinting</label>
                  <div class="toggle-switch">
                    <input type="checkbox" id="device-fingerprinting" v-model="deviceFingerprinting" class="toggle-input">
                    <label for="device-fingerprinting" class="toggle-label"></label>
                  </div>
                </div>
                <button class="save-button">Enregistrer les modifications</button>
              </div>
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
const isPushed = ref(false) // Nouvelle propriété pour contrôler la position de la page
const activeTab = ref('general')
// General settings
const appName = ref('Fraud Stop')
const language = ref('fr')
const timezone = ref('GMT+1')
const currency = ref('XOF')
// Notification settings
const emailNotifications = ref(true)
const smsNotifications = ref(false)
const pushNotifications = ref(true)
const notificationFrequency = ref('realtime')
// Security settings
const sessionTimeout = ref('30')
const twoFactorAuth = ref(false)
// Fraud rules settings
const transactionLimit = ref(500000)
const transactionVelocity = ref(5)
const geolocationCheck = ref(true)
const ipCheck = ref(true)
const deviceFingerprinting = ref(true)
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
const pushPageLeft = () => {
  isPushed.value = true
}
const resetPagePosition = () => {
  isPushed.value = false
}
</script>

<style scoped>
.settings-page {

  min-height: 100vh;
  background-color: #f8fafc;
  font-family: sans-serif;
  max-width: -80px;
  margin-right: -220px;
 
 
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
  padding: 2rem;
  width: calc(100% - 280px);
  transition: all 0.3s ease;
}
.main-content-expanded {
  margin-left: 80px;
  width: calc(100% - 80px);
}
.main-content-pushed {
  margin-left: 80px; /* Ajustez cette valeur selon vos besoins */
}
.page-header {
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  padding: 2rem;
  border-radius: 16px;
  color: white;
  margin-bottom: 2rem;
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
.settings-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.settings-tabs {
  display: flex;
  flex-direction: column;
}
.tabs-header {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  overflow-x: auto;
}
.tab-button {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #4b5563;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.tab-button:hover {
  background-color: #f8fafc;
}
.tab-button.active {
  color: #1e40af;
  border-bottom: 2px solid #1e40af;
  font-weight: 600;
}
.tab-pane {
  padding: 2rem;
}
.tab-pane h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
}
.form-input, .form-select {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}
.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #3b82f6;
}
.input-unit {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}
.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d1d5db;
  transition: .4s;
  border-radius: 34px;
}
.toggle-label:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
.toggle-input:checked + .toggle-label {
  background-color: #3b82f6;
}
.toggle-input:checked + .toggle-label:before {
  transform: translateX(24px);
}
.save-button {
  background-color: #1e40af;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-start;
  margin-top: 1rem;
}
.save-button:hover {
  background-color: #1e3a8a;
}
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
  .settings-form {
    max-width: 100%;
  }
  .tabs-header {
    flex-direction: column;
  }
  .tab-button {
    text-align: left;
    padding: 0.75rem 1.5rem;
  }
}
</style>
