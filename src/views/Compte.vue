<template>
  <div class="signup-container">
    <div class="signup-wrapper">
      <div class="header-section">
        <div class="logo-container">
          <div class="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 0L25 15H40L28 24L33 39L20 30L7 39L12 24L0 15H15L20 0Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 class="logo-text">FRAUD STOP</h1>
        </div>
        <p class="subtitle">Système de détection automatique de fraude Mobile Money</p>
      </div>

      <div class="form-container">
        <form @submit.prevent="register" class="signup-form">
          <div class="form-group">
            <label for="organization">Nom de l'organisation *</label>
            <input 
              type="text" 
              id="organisation" 
              name="organisation"
              v-model="formData.organization"
              placeholder="Ex: Orange Money, Moov money, Telecel money..."
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email professionnel *</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                v-model="formData.email"
                placeholder="admin@votre-operateur.com"
                required
              />
            </div>
            <div class="form-group">
              <label for="phone">Téléphone *</label>
              <input 
                type="tel" 
                id="phone" 
                name="telephone"
                v-model="formData.phone"
                placeholder="+226 XX XX XX XX"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="organizationType">Type d'organisation *</label>
            <select id="organizationType" v-model="formData.organizationType" required>
              <option value="">Sélectionnez le type</option>
              <option value="mobile-operator">Opérateur Mobile</option>
              <option value="financial-institution">Institution Financière</option>
              <option value="other">Autre</option>
            </select>
          </div>

         

          <div class="form-row">
            <div class="form-group">
              <label for="password">Mot de passe *</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                v-model="formData.password"
                placeholder="Minimum 8 caractères"
                required
              />
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirmer le mot de passe *</label>
              <input 
                type="password" 
                id="confirmPassword" 
                v-model="formData.confirmPassword"
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>
          </div>

          
          <button @click="dashbord" type="submit" class="submit-btn" :disabled="!isFormValid">
            <span class="btn-text">Créer mon compte</span>
            <div class="btn-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
        </form>

        <div class="login-link">
          <p>Vous avez déjà un compte ? <a href="#" class="link">Se connecter</a></p>
        </div>
      </div>
    </div>

   
    <div class="background-animation">
      <div class="floating-element floating-1"></div>
      <div class="floating-element floating-2"></div>
      <div class="floating-element floating-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, computed } from 'vue'
interface FormData {
  organization: string
  email: string
  phone: string
  organizationType: string
  country: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  newsletter: boolean
}

const formData = ref<FormData>({
  organization: '',
  email: '',
  phone: '',
  organizationType: '',
  country: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  newsletter: false
})

const isFormValid = computed(() => {
  return formData.value.organization &&
         formData.value.email &&
         formData.value.phone &&
         formData.value.organizationType &&
         formData.value.country &&
         formData.value.password &&
         formData.value.confirmPassword &&
         formData.value.password === formData.value.confirmPassword &&
         formData.value.acceptTerms
})

const handleSubmit = () => {
  if (isFormValid.value) {
    console.log('Form submitted:', formData.value)
    alert('Compte créé avec succès ! Un email de confirmation vous a été envoyé.')
  }
};



  
   

function dashbord(){
        this.router.push('/dashboard')
      }


  async function register() {
    console.log('bouton appuyer');
    
  try {
        const response = await axios.post('http://localhost:3000/api/auth/register');
        if(response.status == 201){
          console.log('Connexion réussie', response.data);
         // Redirigez l'utilisateur ou stockez le token d'authentification
         
        }
        else{
          console.log('Connexion echoue', console.error);
          
        }
        
      } catch (error) {
        console.error('Erreur de connexion', error);
      }
}
</script>



<style scoped>
.signup-container {
  min-height: 100vh;
  background: #004D8A;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  font-family: sans-serif;
  font-size: 1.2rem;
}

.signup-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-section {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.logo-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.logo-text {
  font-size: 1.9rem;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.5;
}

.form-container {
  width: 100%;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.form-group input,
.form-group select {
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input::placeholder {
  color: #9ca3af;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.checkbox-group input[type="checkbox"] {
  margin-top: 0.25rem;
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
}

.checkbox-label {
  font-size: 1rem;
  color: #374151;
  line-height: 1.5;
}

.terms-link {
  color: #6da4fc;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

.submit-btn {
  background: #1114db93;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
 
}




.btn-text {
  font-size: 1rem;
}

.btn-icon {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.submit-btn:hover .btn-icon {
  transform: translateX(2px);
}

.login-link {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.login-link p {
  color: #64748b;
  margin: 0;
}

.link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.floating-element {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.floating-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: -2s;
}

.floating-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation-delay: -4s;
}

.floating-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: -1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .signup-container {
    padding: 1rem;
  }
  
  .signup-wrapper {
    padding: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .logo-container {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .signup-wrapper {
    padding: 1.5rem;
  }
  
  .form-group input,
  .form-group select {
    padding: 0.75rem;
  }
  
  .submit-btn {
    padding: 0.875rem 1.5rem;
  }
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      organisation: '',
      email: '',
      phone: '',
      organisationType: '',
      password: '',
      acceptTerms: false,
      subscribeToNews: false,
      error: '',
      success: ''
    };
  },
  methods: {
    async registerUser() {
      this.error = '';
      this.success = '';

      if (!this.acceptTerms) {
        this.error = 'Vous devez accepter les termes et conditions.';
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            organisation: this.organisation,
            email: this.email,
            phone: this.phone,
            organisationType: this.organisationType,
            password: this.password,
            acceptTerms: this.acceptTerms,
            subscribeToNews: this.subscribeToNews
          }),
        });

        const data = await res.json();

        if (res.ok) {
          this.success = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
          // Optionnel : reset formulaire
          this.organisation = '';
          this.email = '';
          this.phone = '';
          this.organisationType = '';
          this.password = '';
          this.acceptTerms = false;
          this.subscribeToNews = false;
        } else {
          this.error = data.message || 'Erreur inconnue.';
        }
      } catch (err) {
        this.error = 'Erreur réseau : ' + err.message;
      }
    }
  }
};
</script>
