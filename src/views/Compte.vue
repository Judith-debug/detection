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
              <label for="prenom">Prénom</label>
              <input id="prenom" v-model="form.prenom" type="text" placeholder="Votre prénom" :class="{ error: errors.prenom }">
              <span v-if="errors.prenom" class="error-message">{{ errors.prenom }}</span>
            </div>
            <div class="form-group">
              <label for="nom">Nom</label>
              <input id="nom" v-model="form.nom" type="text" placeholder="Votre nom" :class="{ error: errors.nom }">
              <span v-if="errors.nom" class="error-message">{{ errors.nom }}</span>
            </div>
          </div>
        </div>
        <div class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label for="organisation">Nom de l'organisation</label>
              <input id="organisation" v-model="form.organisation" type="text" placeholder="Nom de votre organisation" :class="{ error: errors.organisation }">
              <span v-if="errors.organisation" class="error-message">{{ errors.organisation }}</span>
            </div>
            <div class="form-group">
              <label for="organisationType">Type d'organisation</label>
              <select id="organisationType" v-model="form.organisationType" :class="{ error: errors.organisationType }">
                <option value="">Sélectionner le type</option>
                <option v-for="type in organisationTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
              </select>
              <span v-if="errors.organisationType" class="error-message">{{ errors.organisationType }}</span>
            </div>
          </div>
        </div>
        <div class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label for="email">Adresse email professionnelle</label>
              <input id="email" v-model="form.email" type="email" placeholder="votre.email@organisation.com" :class="{ error: errors.email }">
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label for="phone">Numéro de téléphone</label>
              <input id="phone" v-model="form.phone" type="tel" placeholder="+226 XX XX XX XX" :class="{ error: errors.phone }">
              <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
            </div>
          </div>
        </div>
        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="isLoading" class="loading-spinner"></span>
          <svg v-if="!isLoading" viewBox="0 0 24 24" fill="none" class="btn-icon">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
          {{ isLoading ? 'Création en cours...' : 'Créer mon compte' }}
        </button>
      </form>
      <div class="footer">
        <p>
    Vous avez déjà un compte ?
    <router-link to="/login" class="link" >Se connecter</router-link>
  </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


import { ref, reactive } from 'vue';
import axios from 'axios';

const form = reactive({
  nom: '',
  prenom: '',
  organisation: '',
  organisationType: '',
  email: '',
  phone: '',
});

const errors = reactive({
  nom: '',
  prenom: '',
  organisation: '',
  organisationType: '',
  email: '',
  phone: '',
});

const isLoading = ref(false);

const organisationTypes = [
  { value: 'operator', label: 'Opérateur Mobile Money' },
  { value: 'financial', label: 'Institution Financière' }
];

const validateForm = () => {
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });

  let isValid = true;

  if (!form.nom.trim()) {
    errors.nom = 'Le nom est requis';
    isValid = false;
  }

  if (!form.prenom.trim()) {
    errors.prenom = 'Le prénom est requis';
    isValid = false;
  }

  if (!form.organisation.trim()) {
    errors.organisation = 'Le nom de l\'organisation est requis';
    isValid = false;
  }

  if (!form.organisationType) {
    errors.organisationType = 'Veuillez sélectionner le type d\'organisation';
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = 'L\'email est requis';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Format d\'email invalide';
    isValid = false;
  }

  if (!form.phone.trim()) {
    errors.phone = 'Le numéro de téléphone est requis';
    isValid = false;
  } else if (!/^\+?[0-9]{8,15}$/.test(form.phone.replace(/\s/g, ''))) {
    errors.phone = 'Numéro de téléphone invalide';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  console.log("Bouton appuyé");
  if (!validateForm()) return;
  isLoading.value = true;
  console.log(form);

  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', {
      nom: form.nom,
      prenom: form.prenom,
      organisation: form.organisation,
      organisationType: form.organisationType,
      email: form.email,
      phone: form.phone
    });
    console.log('Réponse API:', response.data);
    alert('Compte créé avec succès !');
  } catch (error) {
    console.error('Erreur API :', error);
    if (error.response && error.response.data && error.response.data.message) {
      alert('Erreur : ' + error.response.data.message);
    } else {
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  } finally {
    isLoading.value = false;
  }
  
};
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
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
  padding: 20px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
  background: #60a5fa;
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
  font-size: 28px;
  font-weight: 800;
  background: #60a5fa;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
}

.header h1 {
  font-size: 30px;
  font-weight: 800;
  color: hsl(226, 82%, 32%);
  margin-bottom: 12px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  margin: 1%;
  
}

.form-group label {
  font-size: 15px;
  font-weight: 550;
  color: #282e36;
}

.form-group input,
.form-group select {
  padding: 16px;
  border: 1px solid #9e9e9e;
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
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
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




@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.submit-btn {
  background: #3b82f6;
  color: white;
  padding: 18px 20px;
  margin: 15px auto;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 15px; 
}


.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4); /* Ajustement de l'ombre pour un effet plus subtil */
}

.submit-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}
.btn-icon {
  width: 16px; /* Diminuer la largeur de l'icône */
  height: 16px; /* Diminuer la hauteur de l'icône */
  
}


.footer {
  text-align: center;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

.footer p {
  color: #64748b;
  font-size: 16px;
  margin-top: 20px;
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
    padding: 15px;
  }

  .signup-card {
    width: 95%;
    padding: 15px;
  }

  .form-row {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 24px;
  }

  .logo span {
    font-size: 20px;
  }

  .submit-btn {
    padding: 14px;
    font-size: 16px;
  }
}
</style>
