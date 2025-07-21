<template>
  <div id="app">
    <router-view></router-view>
  </div>
  <div class="homepage">

    <header class="header">
      <h1 class="logo">Fraud Stop</h1>
<router-link to="/Compte" class="start-button">Créer un compte</router-link>


    </header>

    
    <main class="main-content">
      
      <section class="left-panel">
        <h2 class="welcome-title">
          Bienvenue sur <br />
          <span class="brand">Fraud Stop</span>
        </h2>
        <p class="subtitle">
          <strong>Grace à nos</strong><span style="color:#93c5fd" > Algo de détection</span><br> performants,
        </p>
        <p class="description">
          <strong>Surveillez vos données, détectez les</strong> <br> comportements suspects, en toute simplicité.
        </p>
        <button @click="goToLogin" class="button">Se connecter</button>
      </section> 
    <section class="right-panel">
  <img src="@/assets/garde.png" alt="Image" class="image-droite" />
</section>
     
    </main>

    
    <footer class="footer">
      Copyright © 2025 Fraud Stop. Tous droits réservés
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: "Acceuil",
methods:{
  goToLogin(){
    this.$router.push({name:'Login'});
    window.location.href="/login";
  }
}
  
};
</script>

<style scoped>

.homepage {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
}


.header {
  
  background-color: #1e40af;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 20px 24px;
  align-items: center;
  position: relative;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  font-size: 2rem;
  margin-left: 70px;
  margin-top: 10px;
}

.start-button {
  position: relative;
  z-index: 10;
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.start-button:hover {
  background-color: #60a5fa;
}


.login-link:hover {
  text-decoration: underline;
}

.main-content {
  display: flex;
  flex: 1;
}


.left-panel {
  flex: 1;
  background-color: #1e40af;
  color: white;
  padding: 10px;
  display: flex;
 flex-direction: column;
  justify-content: center;
}

.welcome-title {
  font-size: 36px;
  
   font-size: 4rem;
   margin-bottom: 43%;
 
   align-items: center;
}

.brand {
  display: inline-flex;
  margin-top: 15rem; 
  
  color: #93c5fd;
  margin-top: 2.5rem;
  padding-bottom: 40px;
  
}

.subtitle {
  position: relative;
top: -400px;
font-size: 35px;
  font-weight: bold;
  margin-left: 70px;
}

.description {
  font-size: 22px;
 margin-left: 65px;
  margin-top: -390px;
  
}


.start-button {

  font-size: 21px;
  background-color: #1105b600;
   
  color: rgb(252, 252, 252);
  padding: 24px 70px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content;
}

.start-button:hover {
 position: relative;
  z-index: 10; 
 background-color: #0432ca;
}


.right-panel {
  flex: 1;
 
  pointer-events: none;
  background-color: #71B5D3;
  margin-top: -114px; 
  z-index: 1;
  position: relative; 
}


.button {
  background-color: #71B5D3;      
  color: rgb(8, 8, 8); 
  margin-left: 7%;                   
  padding: 1.2rem; 
  width: 250px; 
          
  font-size: 1.3rem;                
  font-weight: 650;                /* Texte semi-gras */
  border: none;                    /* Pas de bordure */
  border-radius: 8px;              /* Bords arrondis */
  cursor: pointer;                 /* Curseur main */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ombre douce */
  transition: all 0.3s ease;       /* Animation fluide */
  position: relative;              /* Permet z-index */
  z-index: 10;                     /* S'affiche au-dessus */
}

.button:hover {
  background-color: #2563eb;       /* Bleu plus foncé au survol */
  transform: translateY(-2px);     /* Léger effet de soulèvement */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.button:active {
  transform: translateY(0);        /* Remet à plat quand cliqué */
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}



.footer {
  text-align: center;
  margin-bottom: 12px;
  margin-top: 1cqb;
  font-size: 20px;
  color: #4b5563;
  padding: 16px;
  background-color: #ffffff;
}

.image-droite {
  width: 970px;   
  height: auto;
  margin-top: 70px;
  
  margin-left: -10px;
}
h2{
  margin-left: 60px;
}
</style>

