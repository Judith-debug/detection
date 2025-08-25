<template>
  <div class="role-management-app">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <h1 class="header-title">Gestion des Rôles</h1>
        <p class="header-subtitle">Gérez les permissions et accès des utilisateurs</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- Statistics Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="stat-info">
              <h3>{{ totalUsers }}</h3>
              <p>Utilisateurs Total</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <div class="stat-info">
              <h3>{{ operatorCount }}</h3>
              <p>Opérateurs</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-3 3V21a1 1 0 01-1 1H7a1 1 0 01-1-1V9.586l-3-3V4z"/>
              </svg>
            </div>
            <div class="stat-info">
              <h3>{{ institutionCount }}</h3>
              <p>Institutions</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="stat-info">
              <h3>{{ activeUsers }}</h3>
              <p>Actifs</p>
            </div>
          </div>
        </div>

        <!-- Filters and Actions -->
        <div class="toolbar">
          <div class="filters">
            <div class="filter-group">
              <label for="userType">Type d'utilisateur</label>
              <select id="userType" v-model="selectedFilter" class="filter-select">
                <option value="all">Tous</option>
                <option value="operator">Opérateurs</option>
                <option value="institution">Institutions</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label for="status">Statut</label>
              <select id="status" v-model="statusFilter" class="filter-select">
                <option value="all">Tous</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>
          
          <button class="btn-primary" @click="showAddUserModal = true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4v16m8-8H4"/>
            </svg>
            Nouvel utilisateur
          </button>
        </div>

        <!-- Users List -->
        <div class="users-section">
          <div class="section-header">
            <h2>Utilisateurs et Permissions</h2>
            <p>{{ filteredUsers.length }} utilisateur(s) trouvé(s)</p>
          </div>
          
          <div class="users-grid">
            <div v-for="user in filteredUsers" :key="user.id" class="user-card">
              <div class="user-info">
                <div class="user-avatar">
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <div class="user-details">
                  <h3>{{ user.name }}</h3>
                  <p class="user-email">{{ user.email }}</p>
                  <div class="user-meta">
                    <span class="user-type" :class="user.type">
                      {{ user.type === 'operator' ? 'Opérateur' : 'Institution Financière' }}
                    </span>
                    <span class="user-status" :class="user.status">
                      {{ user.status === 'active' ? 'Actif' : 'Inactif' }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="permissions-section">
                <h4>Permissions d'accès</h4>
                <div class="permissions-grid">
                  <div v-for="tab in availableTabs" :key="tab.key" class="permission-item">
                    <label class="permission-label">
                      <input 
                        type="checkbox" 
                        :checked="user.permissions.includes(tab.key)"
                        @change="togglePermission(user.id, tab.key)"
                        class="permission-checkbox"
                      >
                      <span class="permission-name">{{ tab.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="user-actions">
                <button class="btn-secondary" @click="editUser(user)">
                  Modifier
                </button>
                <button class="btn-danger" @click="deleteUser(user.id)">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add User Modal -->
    <div v-if="showAddUserModal" class="modal-overlay" @click="showAddUserModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Ajouter un utilisateur</h3>
          <button class="modal-close" @click="showAddUserModal = false">×</button>
        </div>
        
        <form @submit.prevent="addUser" class="modal-body">
          <div class="form-group">
            <label for="newUserName">Nom complet</label>
            <input 
              id="newUserName"
              v-model="newUser.name" 
              type="text" 
              required
              class="form-input"
              placeholder="Entrez le nom complet"
            >
          </div>
          
          <div class="form-group">
            <label for="newUserEmail">Email</label>
            <input 
              id="newUserEmail"
              v-model="newUser.email" 
              type="email" 
              required
              class="form-input"
              placeholder="exemple@email.com"
            >
          </div>
          
          <div class="form-group">
            <label for="newUserType">Type d'utilisateur</label>
            <select id="newUserType" v-model="newUser.type" required class="form-select">
              <option value="">Sélectionner un type</option>
              <option value="operator">Opérateur</option>
              <option value="institution">Institution Financière</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Permissions par défaut</label>
            <div class="permissions-grid">
              <div v-for="tab in availableTabs" :key="tab.key" class="permission-item">
                <label class="permission-label">
                  <input 
                    type="checkbox" 
                    v-model="newUser.permissions"
                    :value="tab.key"
                    class="permission-checkbox"
                  >
                  <span class="permission-name">{{ tab.name }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="showAddUserModal = false">
              Annuler
            </button>
            <button type="submit" class="btn-primary">
              Ajouter l'utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

interface User {
  id: number
  name: string
  email: string
  type: 'operator' | 'institution'
  status: 'active' | 'inactive'
  permissions: string[]
}

// Available tabs that users can access
const availableTabs = [
  { key: 'dashboard', name: 'Dashboard' },
  { key: 'transactions', name: 'Transactions' },
  { key: 'alerts', name: 'Alertes' },
  { key: 'reports', name: 'Rapports' },
  { key: 'settings', name: 'Paramètres' }
]

// Sample users data
const users = ref<User[]>([
  {
    id: 1,
    name: 'Marie Dubois',
    email: 'marie.dubois@example.com',
    type: 'operator',
    status: 'active',
    permissions: ['dashboard', 'transactions', 'alerts', 'reports']
  },
  {
    id: 2,
    name: 'Jean Martin',
    email: 'jean.martin@banque.com',
    type: 'institution',
    status: 'active',
    permissions: ['dashboard', 'transactions', 'reports', 'settings']
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.com',
    type: 'operator',
    status: 'inactive',
    permissions: ['dashboard', 'alerts']
  },
  {
    id: 4,
    name: 'Credit Agricole',
    email: 'admin@credit-agricole.fr',
    type: 'institution',
    status: 'active',
    permissions: ['dashboard', 'transactions', 'reports', 'settings']
  },
  {
    id: 5,
    name: 'Paul Bertrand',
    email: 'paul.bertrand@example.com',
    type: 'operator',
    status: 'active',
    permissions: ['dashboard', 'transactions', 'alerts', 'reports', 'settings']
  }
])

// Filters
const selectedFilter = ref('all')
const statusFilter = ref('all')


// Modal
const showAddUserModal = ref(false)
const newUser = reactive({
  name: '',
  email: '',
  type: '',
  permissions: [] as string[]
})

// Computed properties
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const typeMatch = selectedFilter.value === 'all' || user.type === selectedFilter.value
    const statusMatch = statusFilter.value === 'all' || user.status === statusFilter.value
    return typeMatch && statusMatch
  })
})

const totalUsers = computed(() => users.value.length)
const operatorCount = computed(() => users.value.filter(u => u.type === 'operator').length)
const institutionCount = computed(() => users.value.filter(u => u.type === 'institution').length)
const activeUsers = computed(() => users.value.filter(u => u.status === 'active').length)

// Methods
const togglePermission = (userId: number, permission: string) => {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    const index = user.permissions.indexOf(permission)
    if (index > -1) {
      user.permissions.splice(index, 1)
    } else {
      user.permissions.push(permission)
    }
  }
}

const addUser = () => {
  const newId = Math.max(...users.value.map(u => u.id)) + 1
  users.value.push({
    id: newId,
    name: newUser.name,
    email: newUser.email,
    type: newUser.type as 'operator' | 'institution',
    status: 'active',
    permissions: [...newUser.permissions]
  })
  
  // Reset form
  Object.assign(newUser, {
    name: '',
    email: '',
    type: '',
    permissions: []
  })
  
  showAddUserModal.value = false
}

const editUser = (user: User) => {
  // Implementation for editing user
  console.log('Edit user:', user)
}

const deleteUser = (userId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    const index = users.value.findIndex(u => u.id === userId)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }
 

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.role-management-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  color: #ffffff;
  font-family: 'Inter', system-ui, sans-serif;
}

/* Header */
.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-subtitle {
  font-size: 1.125rem;
  opacity: 0.8;
}

/* Main Content */
.main-content {
  padding: 2rem 0;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Statistics Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.stat-info h3 {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-info p {
  opacity: 0.7;
  font-size: 0.875rem;
}

/* Toolbar */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.8;
}

.filter-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.875rem;
  min-width: 150px;
}

.filter-select option {
  background: #1e40af;
  color: white;
}

/* Buttons */
.btn-primary {
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  border: none;
  border-radius: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.btn-primary svg {
  width: 1rem;
  height: 1rem;
  stroke-width: 2;
  stroke: currentColor;
  fill: none;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-danger {
  background: linear-gradient(45deg, #ef4444, #dc2626);
  border: none;
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.btn-danger:hover {
  background: linear-gradient(45deg, #dc2626, #b91c1c);
}

/* Users Section */
.users-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.section-header p {
  opacity: 0.7;
  font-size: 0.875rem;
}

/* Users Grid */
.users-grid {
  display: grid;
  gap: 1.5rem;
}

.user-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.user-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.user-avatar {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
}

.user-details h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.user-email {
  opacity: 0.7;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.user-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.user-type, .user-status {
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.user-type.operator {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.user-type.institution {
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
}

.user-status.active {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.user-status.inactive {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

/* Permissions */
.permissions-section {
  margin-bottom: 1.5rem;
}

.permissions-section h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.permission-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.permission-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.permission-checkbox {
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.25rem;
  position: relative;
  cursor: pointer;
}

.permission-checkbox:checked {
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  border-color: #3b82f6;
}

.permission-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

/* User Actions */
.user-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  backdrop-filter: blur(20px);
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-input, .form-select {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.875rem;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-select option {
  background: #1e40af;
  color: white;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-title {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters {
    justify-content: center;
  }
  
  .users-section {
    padding: 1rem;
  }
  
  .user-info {
    flex-direction: column;
    text-align: center;
  }
  
  .permissions-grid {
    grid-template-columns: 1fr;
  }
  
  .user-actions {
    justify-content: center;
  }
  
  .modal {
    margin: 1rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0 1rem;
  }
  
  .header-content {
    padding: 0 1rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .user-card {
    padding: 1rem;
  }
}
</style>