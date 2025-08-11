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
          <h1 class="form-title">Connectez-vous</h1>
          <p class="form-subtitle">Veuillez entrer vos identifiants <br> pour vous connecter</p>
          <form @submit.prevent="handleLogin" class="login-form-fields">
            <div class="form-group">
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                class="form-input"
                required
              />
              <p v-if="error && emailError" class="error-message">{{ emailError }}</p>
            </div>
            <div class="form-group">
              <input
                type="password"
                v-model="password"
                placeholder="Mot de passe"
                class="form-input"
                required
              />
              <p v-if="error && passwordError" class="error-message">{{ passwordError }}</p>
            </div>
            <button type="submit" class="login-button">
              Se connecter
            </button>
          </form>
          <!-- Ajout des informations d'identification par défaut -->
          <p class="default-credentials">
            Identifiant par défaut : <br>
            admindetection@gmail.com | admin123
          </p>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref(false);
const emailError = ref('');
const passwordError = ref('');

const handleLogin = () => {
  emailError.value = '';
  passwordError.value = '';

  if (email.value !== 'admindetection@gmail.com') {
    emailError.value = 'Email incorrect';
    error.value = true;
    return;
  }

  if (password.value !== 'admin123') {
    passwordError.value = 'Mot de passe incorrect';
    error.value = true;
    return;
  }

  // Si tout est correct
  router.push({ name: 'layout' });
  localStorage.setItem('token', 'dummyToken'); // Vous pouvez remplacer cela par un vrai token si nécessaire
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
  max-width: 400px;
}
.logo-section {
  margin-bottom: 32rem;
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
  margin-top: -25rem;
}
.form-title {
  font-size: 2.3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2.5rem;
  line-height: 1.2;
  margin-right: 3rem;
}
.form-subtitle {
  font-size: 1.2rem;
  color: #666;
  line-height: 2;
  margin-right: 2.5rem;
  position: relative;
  top: -19px;
}
.login-form-fields {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-input {
  padding: 1rem 1rem;
  border: 1px solid #8abdf0;
  border-radius: 8px;
  font-size: 1.2rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #ffffff;
}
.form-input:focus {
  outline: none;
  border-color: #0F7CBC;
  box-shadow: 0 0 0 3px rgba(15, 124, 188, 0.1);
}
.form-input::placeholder {
  color: #9ca3af;
}
.login-button {
  background-color: #0F7CBC;
  color: white;
  padding: 1rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 200;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-top: 0;
}
.login-button:hover {
  background-color: #0a5d94;
  transform: translateY(-1px);
}
.login-button:active {
  transform: translateY(0);
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
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
.default-credentials {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: hsla(221, 92%, 59%, 0.699);
  font-weight: 600;
  letter-spacing: 0.1rem;
  font-family: 'Times New Roman', Times, serif;
}
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
.image-droite {
  width: 1000px;
  height: auto;
  margin-top: 10px;
  margin-left: -10px;
}
@media (min-width: 1200px) {
  .login-form {
    max-width: 450px;
  }
}
</style>
