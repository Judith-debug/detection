<template>
  <div class="login-container">
    <div class="login-form-section">
      <div class="login-form">
        <div class="logo-section">
          <div class="logo">
            <svg class="shield-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="#0F7CBC"/>
              <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="logo-text">Fraud Stop</span>
          </div>
        </div>
        <div class="form-content">
          <h1 class="form-title">Première Connexion</h1>
          <p class="form-subtitle">Utilisez votre email et le code secret reçu par email,<br> puis définissez votre nouveau mot de passe</p>
          
          <!-- ✅ Notification de succès/erreur -->
          <div v-if="notification.show" :class="['notification', notification.type]">
            {{ notification.message }}
          </div>
          
          <form @submit.prevent="handleLogin" class="login-form-fields">
            
            <div class="form-group">
              <input
                type="email"
                v-model="formData.email"
                placeholder="Email"
                class="form-input"
                :class="{ 'error': errors.email }"
                required
              />
              <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
            </div>
            
            <!-- ✅ Champ Code Secret (mot de passe temporaire) -->
            <div class="form-group">
              <input
                type="password"
                v-model="formData.temporaryPassword"
                placeholder="Code secret (reçu par email)"
                class="form-input"
                :class="{ 'error': errors.temporaryPassword }"
                required
              />
              <p v-if="errors.temporaryPassword" class="error-message">{{ errors.temporaryPassword }}</p>
            </div>

            <!-- ✅ Champ Nouveau Mot de Passe -->
            <div class="form-group">
              <input
                type="password"
                v-model="formData.newPassword"
                placeholder="Nouveau mot de passe"
                class="form-input"
                :class="{ 'error': errors.newPassword }"
                required
              />
              <p v-if="errors.newPassword" class="error-message">{{ errors.newPassword }}</p>
            </div>

            <!-- ✅ Champ Confirmation du Mot de Passe -->
            <div class="form-group">
              <input
                type="password"
                v-model="formData.confirmPassword"
                placeholder="Confirmer le mot de passe"
                class="form-input"
                :class="{ 'error': errors.confirmPassword }"
                required
              />
              <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
            </div>
            
          
            <button type="submit" class="login-button" :disabled="isLoading">
              <span v-if="isLoading">Connexion en cours...</span>
              <span v-else>Se connecter</span>
            </button>
          </form>
          
          <!-- ✅ Informations d'aide -->
         
        </div>
      </div>
    </div>
    <div class="blue-section">
      <div class="blue-content">
        <img src="@/assets/Login.png" alt="Image" class="image-droite" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// ✅ Données du formulaire
const formData = reactive({
  email: '',
  temporaryPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// ✅ Gestion des erreurs
const errors = reactive({
  email: '',
  temporaryPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// ✅ État de chargement
const isLoading = ref(false);

// ✅ Notifications
const notification = reactive({
  show: false,
  message: '',
  type: 'success' // 'success' ou 'error'
});

// ✅ Fonction pour afficher une notification
const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  notification.message = message;
  notification.type = type;
  notification.show = true;
  
  // Masquer automatiquement après 5 secondes
  setTimeout(() => {
    notification.show = false;
  }, 5000);
};

// ✅ Fonction pour réinitialiser les erreurs
const clearErrors = () => {
  errors.email = '';
  errors.temporaryPassword = '';
  errors.newPassword = '';
  errors.confirmPassword = '';
};

// ✅ Fonction de validation
const validateForm = (): boolean => {
  clearErrors();
  let isValid = true;

  // Validation de l'email
  if (!formData.email) {
    errors.email = 'L\'email est requis';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Format d\'email invalide';
    isValid = false;
  }

  // Validation du code secret
  if (!formData.temporaryPassword) {
    errors.temporaryPassword = 'Le code secret est requis';
    isValid = false;
  }

  // Validation du nouveau mot de passe
  if (!formData.newPassword) {
    errors.newPassword = 'Le nouveau mot de passe est requis';
    isValid = false;
  } else if (formData.newPassword.length < 8) {
    errors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
    isValid = false;
  }

  // Validation de la confirmation
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'La confirmation du mot de passe est requise';
    isValid = false;
  } else if (formData.newPassword !== formData.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    isValid = false;
  }

  return isValid;
};

// ✅ Fonction principale de connexion
const handleLogin = async () => {
  // Validation du formulaire
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;
  clearErrors();

  try {
    // ✅ Appel à l'API FastAPI
    const response = await fetch('http://localhost:8000/initial-login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        temporary_password: formData.temporaryPassword,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Succès - Stocker les informations de session avec permissions
      localStorage.setItem('userToken', data.token || 'dummy-token');
      localStorage.setItem('userId', data.user_id);
      localStorage.setItem('organizationName', data.organization_name);
      localStorage.setItem('userEmail', formData.email); 
      localStorage.setItem('userPermissions', JSON.stringify(data.permissions)); // ✅ IMPORTANT
      
      console.log('Connexion réussie - Données stockées:', {
        userId: data.user_id,
        organizationName: data.organization_name,
        permissions: data.permissions,
        email: formData.email
      });
      
      showNotification('Connexion réussie ! Redirection en cours...', 'success');
      
      // ✅ Redirection vers le layout après un court délai
      setTimeout(() => {
        router.push({ name: 'layout' });
      }, 1500);
      
    } else {
      // ✅ Gestion des erreurs spécifiques de l'API
      let errorMessage = data.detail || 'Une erreur est survenue';
      
      if (errorMessage.includes('Code secret')) {
        errors.temporaryPassword = errorMessage;
      } else if (errorMessage.includes('mot de passe')) {
        errors.newPassword = errorMessage;
      } else if (errorMessage.includes('Email')) {
        errors.email = errorMessage;
      } else {
        showNotification(errorMessage, 'error');
      }
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
    showNotification('Erreur de connexion au serveur. Veuillez réessayer.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  font-family: sans-serif;
  display: flex;
  min-height: 100vh;
  background-color: #fff;
}

.login-form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #ffffff;
}

.login-form {
  width: 100%;
  max-width: 450px;
}

.logo-section {
  margin-bottom: 3rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.shield-icon {
  width: 6rem;
  height: 3rem;
  margin-bottom: 0.5rem;
}

.logo-text {
  font-size: 2.5rem;
  font-weight: 600;
  color: #0F7CBC;
}

.form-content {
  width: 100%;
  text-align: center;
}

.form-title {
  font-size: 2.3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.form-subtitle {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 2rem;
}

/* ✅ Styles pour les notifications */
.notification {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.notification.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.notification.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.login-form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-input {
  padding: 1rem;
  border: 1px solid #8abdf0;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #ffffff;
}

.form-input:focus {
  outline: none;
  border-color: #0F7CBC;
  box-shadow: 0 0 0 3px rgba(15, 124, 188, 0.1);
}

.form-input.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: left;
}

.login-button {
  background-color: #0F7CBC;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-top: 1rem;
}

.login-button:hover:not(:disabled) {
  background-color: #0a5d94;
  transform: translateY(-1px);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  transform: none;
}

/* ✅ Styles pour les informations d'aide */
.help-info {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #0F7CBC;
}

.help-info p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #495057;
  text-align: left;
}

.blue-section {
  flex: 1;
  background-color: #0F7CBC;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.blue-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-droite {
  width: 1000px;
  height: auto;
  margin-top: 10px;
  margin-left: -10px;
}

/* ✅ Responsive design amélioré */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  
  .blue-section {
    display: none;
  }
  
  .login-form-section {
    min-height: 100vh;
    padding: 1.5rem;
  }
  
  .login-form {
    max-width: 100%;
  }
  
  .form-title {
    font-size: 1.75rem;
  }
  
  .logo-section {
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .login-form-section {
    padding: 1rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .form-subtitle {
    font-size: 0.9rem;
  }
  
  .form-input {
    padding: 0.75rem;
  }
  
  .login-button {
    padding: 1rem;
  }
}

@media (min-width: 1200px) {
  .login-form {
    max-width: 500px;
  }
}
</style>

