<template>
  <div class="signup-container">
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
    
    <div class="signup-card">
      <div class="header">
        <div class="logo">
           
          <div class="logo-icon">
            
            <svg class="shield-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="white"/>
            <path d="M9 12L11 14L15 10" stroke="#0F7CBC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </div>
          <span>Fraud Stop</span>
        </div>
        <h1>Créer votre compte</h1>

      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-section">
         
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Prénom</label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                placeholder="Votre prénom"
                :class="{ error: errors.firstName }"
              >
              <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
            </div>
            
            <div class="form-group">
              <label for="lastName">Nom</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                placeholder="Votre nom"
                :class="{ error: errors.lastName }"
              >
              <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
            </div>
          </div>
        </div>

        <div class="form-section">
         
          <div class="form-group">
            <label for="organizationName">Nom de l'organisation</label>
            <input
              id="organizationName"
              v-model="form.organizationName"
              type="text"
              placeholder="Nom de votre organisation"
              :class="{ error: errors.organizationName }"
            >
            <span v-if="errors.organizationName" class="error-message">{{ errors.organizationName }}</span>
          </div>

          <div class="form-group">
            <label for="organizationType">Type d'organisation</label>
            <select
              id="organizationType"
              v-model="form.organizationType"
              :class="{ error: errors.organizationType }"
            >
              <option value="">Sélectionner le type</option>
              <option v-for="type in organizationTypes" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
            <span v-if="errors.organizationType" class="error-message">{{ errors.organizationType }}</span>
          </div>
        </div>

        <div class="form-section">
         
          <div class="form-group">
            <label for="email">Adresse email professionnelle</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="votre.email@organisation.com"
              :class="{ error: errors.email }"
            >
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="phone">Numéro de téléphone</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="+225 XX XX XX XX XX"
              :class="{ error: errors.phone }"
            >
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>
        </div>

       
                  
        <button
          type="submit"
          class="submit-btn"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          <svg v-if="!isLoading" viewBox="0 0 24 24" fill="none" class="btn-icon">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
          {{ isLoading ? 'Création en cours...' : 'Créer mon compte professionnel' }}
        </button>
      </form>

      <div class="footer">
        <p>Vous avez déjà un compte ? <a href="#" class="link">Se connecter</a></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  organizationName: '',
  organizationType: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  organizationName: '',
  organizationType: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  terms: ''
})

const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const organizationTypes = [
  { value: 'operator', label: 'Opérateur Mobile Money' },
  { value: 'financial', label: 'Institution Financière' }
]

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  if (!form.firstName.trim()) {
    errors.firstName = 'Le prénom est requis'
    isValid = false
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Le nom est requis'
    isValid = false
  }

  if (!form.organizationName.trim()) {
    errors.organizationName = 'Le nom de l\'organisation est requis'
    isValid = false
  }

  if (!form.organizationType) {
    errors.organizationType = 'Veuillez sélectionner le type d\'organisation'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Format d\'email invalide'
    isValid = false
  }

  if (!form.phone.trim()) {
    errors.phone = 'Le numéro de téléphone est requis'
    isValid = false
  } else if (!/^\+?[0-9]{8,15}$/.test(form.phone.replace(/\s/g, ''))) {
    errors.phone = 'Numéro de téléphone invalide'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Le mot de passe est requis'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères'
    isValid = false
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas'
    isValid = false
  }

  if (!form.terms) {
    errors.terms = 'Vous devez accepter les conditions d\'utilisation'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  
  // Simulation d'appel API
  setTimeout(() => {
    isLoading.value = false
    alert('Compte créé avec succès!')
  }, 2000)
}
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: hsl(226, 82%, 32%);
  position: relative;
  overflow: hidden;
}



.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgb(91, 174, 241);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  top: 20%;
  right: -100px;
  animation-delay: 2s;
}



@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.signup-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  padding: 10px;
  width: 50%;
  max-width: 700px;
  margin: 5px;
  box-shadow: 
    0 32px 64px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
}

.logo-icon {
  width: 50px;
  height: 46px;
  background:  #60a5fa;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
}

.logo-icon svg {
  width: 28px;
  height: 28px;
}

.logo span {
  font-size: 32px;
  font-weight: 800;
  background:  #60a5fa;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

.header h1 {
  font-size: 30px;
  font-weight: 800;
  color: hsl(226, 82%, 32%);
  margin-bottom: 12px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.header p {
  font-size: 20px;
  color: #64748b;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 20px;
  background:  #3b82f6 ;
  border-radius: 2px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.form-group input,
.form-group select {
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 
    0 0 0 4px rgba(59, 130, 246, 0.1),
    0 8px 25px -5px rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
  background: white;
}

.form-group input.error,
.form-group select.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.form-group input::placeholder {
  color: #94a3b8;
}




.checkbox-group {
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
  font-size: 15px;
  line-height: 1.6;
  color: #374151;
}

.checkbox {
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.2s ease;
}







.submit-btn {
  background: #3b82f6 ;
  color: white;
  padding: 20px 32px;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 16px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
 
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.4);
}

.submit-btn:hover:not(:disabled)::before {
  left: 100%;
}

.submit-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.footer {
  text-align: center;
  margin-top: 45px;
  padding-top: 32px;
  border-top: 1px solid #e2e8f0;
}

.footer p {
  color: #64748b;
  font-size: 16px;
}

.link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.link:hover {
  color: #1d4ed8;
}

.link:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .signup-container {
    padding: 20px 16px;
  }
  
  .signup-card {
    padding: 32px 24px;
    border-radius: 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .header h1 {
    font-size: 28px;
  }
  
  .header p {
    font-size: 16px;
  }
  
  .logo span {
    font-size: 28px;
  }
  
  .section-title {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .signup-card {
    padding: 24px 20px;
  }
  
  .header h1 {
    font-size: 24px;
  }
  
  .logo span {
    font-size: 24px;
  }
  
  .submit-btn {
    padding: 18px 24px;
    font-size: 16px;
  }
}
</style>