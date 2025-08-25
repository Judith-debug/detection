<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import {
  Users,
  UserCheck,
  Clock,
  Shield,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Star,
  Trash2,
  Phone,
  Building2,
  Mail,
  MapPin,
  User,
  Briefcase,
  Lock,
  Globe,
  FileText,
  X,
  Check,
  Settings,
  BarChart3,
  AlertTriangle,
  Home
} from 'lucide-vue-next';
import { details } from 'caniuse-lite/data/features';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'mobile_operator' | 'financial_institution';
  institution: string;
  status: 'active' | 'pending' | 'inactive';
  lastConnection: string;
  avatar: string | File;
  permissions: string[];
}

interface OrganizationData {
  organizationName: string;
  organizationType: 'mobile_operator' | 'financial_institution' | '';
  registrationNumber: string;
  email: string;
  phone: string;
  website: string;
  avatar: string | File;
  avatarPreview: string;
  permissions: string[];
}

// Onglets disponibles pour les utilisateurs (pas les admins)
const availablePermissions = [
  { key: 'dashboard', name: 'Dashboard', icon: Home, description: 'Accès au tableau de bord principal' },
  { key: 'transactions', name: 'Transactions', icon: FileText, description: 'Gestion et consultation des transactions' },
  { key: 'alerts', name: 'Alertes', icon: AlertTriangle, description: 'Gestion des alertes et notifications' },
  { key: 'reports', name: 'Rapports', icon: BarChart3, description: 'Génération et consultation des rapports' },
  { key: 'settings', name: 'Paramètres', icon: Settings, description: 'Configuration des paramètres utilisateur' }
];

const showModal = ref(false);
const isLoading = ref(false);
const searchQuery = ref('');
const selectedType = ref('all');
const selectedStatus = ref('all');
const notification = ref({
  show: false,
  message: '',
  type: 'success'
});

const organizationData = reactive<OrganizationData>({
  organizationName: '',
  organizationType: '',
  registrationNumber: '',
  email: '',
  phone: '',
  website: '',
  avatar: '',
  avatarPreview: '',
  permissions: []
});

const users = ref<User[]>([
  {
    id: '1',
    name: 'Marie Kabore',
    email: 'marie.kabore@orange.ci',
    phone: '+225 07 01 23 45 67',
    type: 'mobile_operator',
    institution: 'Orange Money',
    status: 'active',
    lastConnection: '15/01/2024',
    avatar: 'https://via.placeholder.com/40/3b82f6/FFFFFF?text=MK',
    permissions: ['dashboard', 'transactions', 'alerts', 'reports']
  },
  {
    id: '2',
    name: 'Jean Kouassi',
    email: 'jean.kouassi@mtn.ci',
    phone: '+225 05 01 23 45 67',
    type: 'mobile_operator',
    institution: 'MTN Mobile Money',
    status: 'active',
    lastConnection: '14/01/2024',
    avatar: 'https://via.placeholder.com/40/3b82f6/FFFFFF?text=JK',
    permissions: ['dashboard', 'transactions', 'settings']
  },
  {
    id: '3',
    name: 'Fatou Diallo',
    email: 'fatou.diallo@ecobank.com',
    phone: '+225 01 01 23 45 67',
    type: 'financial_institution',
    institution: 'Ecobank',
    status: 'pending',
    lastConnection: '12/01/2024',
    avatar: 'https://via.placeholder.com/40/10b981/FFFFFF?text=FD',
    permissions: ['dashboard', 'reports']
  },
  {
    id: '4',
    name: 'Ahmed Ben Ali',
    email: 'ahmed.benali@sgbci.com',
    phone: '+225 03 01 23 45 67',
    type: 'financial_institution',
    institution: 'Société Générale',
    status: 'inactive',
    lastConnection: '10/01/2024',
    avatar: 'https://via.placeholder.com/40/f59e0b/FFFFFF?text=AB',
    permissions: ['dashboard']
  }
]);

const stats = computed(() => ({
  total: users.value.length,
  active: users.value.filter(u => u.status === 'active').length,
  pending: users.value.filter(u => u.status === 'pending').length,
  operators: users.value.filter(u => u.type === 'mobile_operator').length
}));

const isFormValid = computed(() => {
  return organizationData.organizationName &&
         organizationData.organizationType &&
         organizationData.email &&
         organizationData.phone &&
         organizationData.permissions.length > 0;
});

const filteredUsers = computed(() => {
  const query = (searchQuery.value ?? '').toLowerCase();
  return users.value.filter(user => {
    const name = (user.name ?? '').toLowerCase();
    const typeMatch = selectedType.value === 'all' || user.type === selectedType.value;
    const statusMatch = selectedStatus.value === 'all' || user.status === selectedStatus.value;
    return name.includes(query) && typeMatch && statusMatch;
  });
});

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  organizationData.organizationName = '';
  organizationData.organizationType = '';
  organizationData.registrationNumber = '';
  organizationData.email = '';
  organizationData.phone = '';
  organizationData.website = '';
  organizationData.avatar = '';
  organizationData.avatarPreview = '';
  organizationData.permissions = [];
};

const handleAvatarUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    organizationData.avatar = file;
    organizationData.avatarPreview = URL.createObjectURL(file);
  }
};

const togglePermission = (permissionKey: string) => {
  const index = organizationData.permissions.indexOf(permissionKey);
  if (index > -1) {
    organizationData.permissions.splice(index, 1);
  } else {
    organizationData.permissions.push(permissionKey);
  }
};

const selectAllPermissions = () => {
  if (organizationData.permissions.length === availablePermissions.length) {
    organizationData.permissions = [];
  } else {
    organizationData.permissions = availablePermissions.map(p => p.key);
  }
};

const addOrganization = async () => {
  if (!isFormValid.value) return;

  // Mapper les types de ton frontend vers ceux attendus par le backend
   const typeMapping: Record<string, string> = {
    "operateur_mobile": "mobile_operator",
    "institution_financiere": "financial_institution"
  };

  const payload = {
    organization_name: organizationData.organizationName,
    email: organizationData.email,
    phone: organizationData.phone,
    organization_type: typeMapping[organizationData.organizationType] || organizationData.organizationType,
    permissions: organizationData.permissions
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData.detail || errorData));
    }

    const savedUser = await response.json();
    console.log(savedUser)

    users.value.unshift({
      ...savedUser,
      status: 'pending',
      lastConnection: new Date().toLocaleDateString(),
      avatar: organizationData.avatarPreview || '',
      permissions: organizationData.permissions
    });

    closeModal();
    notification.value = {
      show: true,
      message: `Organisation "${organizationData.organizationName}" ajoutée avec succès avec ${organizationData.permissions.length} permission(s) !`,
      type: 'success'
    };
  } catch (error: any) {
    console.error("Erreur :", error);
    alert(`Échec : ${error.message}`);
  }
};

const activateAccount = async (index: number) => {
  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:8000/activate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: users.value[index].email,
      }),
    });
    console.log(response.status);
    
    if (response.ok) {
      users.value[index].status = 'active';
      notification.value = {
        show: true,
        message: `Compte activé avec succès ! Un email de connexion a été envoyé à ${users.value[index].email}`,
        type: 'success'
      };
    } else {
      console.log(response);
      notification.value = {
        show: true,
        message: `Erreur lors de l'activation du compte.`,
        type: 'error'
      };
    }
  } catch (error) {

    console.error('Erreur:', error);
    notification.value = {
      show: true,
      message: `Erreur réseau lors de l'activation du compte.`,
      type: 'error'
    };
  } finally {
    setTimeout(() => {
      notification.value.show = false;
    }, 5000);
    isLoading.value = false;
  }
};

const deactivateAccount = async (index: number) => {
  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:8000/deactivate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: users.value[index].email,
      }),
    });
    if (response.ok) {
      users.value[index].status = 'inactive';
      notification.value = {
        show: true,
        message: `Compte désactivé avec succès!`,
        type: 'success'
      };
    } else {
      notification.value = {
        show: true,
        message: `Erreur lors de la désactivation du compte.`,
        type: 'error'
      };
    }
  } catch (error) {
    console.error('Erreur:', error);
    notification.value = {
      show: true,
      message: `Erreur réseau lors de la désactivation du compte.`,
      type: 'error'
    };
  } finally {
    setTimeout(() => {
      notification.value.show = false;
    }, 5000);
    isLoading.value = false;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-700 bg-green-100';
    case 'pending': return 'text-orange-700 bg-orange-100';
    case 'inactive': return 'text-red-700 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'Actif';
    case 'pending': return 'En Attente';
    case 'inactive': return 'Inactif';
    default: return status;
  }
};

const getTypeText = (type: string) => {
  return type === 'mobile_operator' ? 'Opérateur' : 'Institution';
};

const getPermissionIcon = (permissionKey: string) => {
  const permission = availablePermissions.find(p => p.key === permissionKey);
  return permission?.icon || Shield;
};

const getPermissionName = (permissionKey: string) => {
  const permission = availablePermissions.find(p => p.key === permissionKey);
  return permission?.name || permissionKey;
};

const closeNotification = () => {
  notification.value.show = false;
};
</script>

<template>
  <div class="user-management">
   
    <div class="header">
      <div class="container">
        <div class="header-content">
          <div>
            <h1 class="page-title">Gestion des Utilisateurs</h1>
          </div>
          <div class="header-actions">
            <button @click="openModal" class="btn btn-primary">
              <Plus :size="20" />
              <span>Nouvel Utilisateur</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <div class="container">
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <h3 class="stat-title">Total Utilisateurs</h3>
              <p class="stat-value">{{ stats.total }}</p>
            </div>
            <div class="stat-icon blue">
              <Users :size="24" />
            </div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <h3 class="stat-title">Actifs</h3>
              <p class="stat-value">{{ stats.active }}</p>
            </div>
            <div class="stat-icon green">
              <UserCheck :size="24" />
            </div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <h3 class="stat-title">En Attente</h3>
              <p class="stat-value">{{ stats.pending }}</p>
            </div>
            <div class="stat-icon orange">
              <Clock :size="24" />
            </div>
          </div>
        </div>
      </div>
      <div class="filters-section">
        <div class="search-bar">
          <Search :size="20" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par nom, email ou institution..."
            class="search-input"
          >
        </div>
        <div class="filters">
          <div class="filter-group">
            <Filter :size="16" />
            <select v-model="selectedType" class="filter-select">
              <option value="all">Tous les types</option>
              <option value="mobile_operator">Opérateurs Mobiles</option>
              <option value="financial_institution">Institutions Financières</option>
            </select>
          </div>
          <div class="filter-group">
            <select v-model="selectedStatus" class="filter-select">
              <option value="all">Tous statuts</option>
              <option value="active">Actif</option>
              <option value="pending">En Attente</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>
      </div>
      <div class="table-container">
        <div class="table-header">
          <h2 class="table-title">Liste des Utilisateurs</h2>
        </div>
        <div class="table-wrapper">
          <table class="users-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Type</th>
                <th>Institution</th>
                <th>Permissions</th>
                <th>Statut</th>
                <th>Dernière connexion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in filteredUsers" :key="user.id" class="table-row">
                <td>
                  <div class="user-info">
                    <div class="user-avatar">
                      <img v-if="typeof user.avatar === 'string' && user.avatar" :src="user.avatar" alt="Avatar" class="avatar-img">
                     <div v-else class="avatar-initials">{{ user.name ? user.name.charAt(0).toUpperCase() : '' }}</div>
                    </div>
                    <div class="user-details">
                      <p class="user-name">{{ user.name }}</p>
                      <p class="user-email">{{ user.email }}</p>
                      <p class="user-phone">{{ user.phone }}</p>
                      <p class="user-role">Administrateur Fraude</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="type-badge" :class="user.type === 'mobile_operator' ? 'operator' : 'institution'">
                    <Phone v-if="user.type === 'mobile_operator'" :size="16" />
                    <Building2 v-else :size="16" />
                    {{ getTypeText(user.type) }}
                  </div>
                </td>
                <td class="institution-cell">{{ user.institution }}</td>
                <td>
                  <div class="permissions-list">
                    <div v-for="permission in user.permissions" :key="permission" class="permission-badge">
                      <component :is="getPermissionIcon(permission)" :size="12" />
                      <span>{{ getPermissionName(permission) }}</span>
                    </div>
                    <div v-if="user.permissions.length === 0" class="no-permissions">
                      Aucune permission
                    </div>
                  </div>
                </td>
                <td>
                  <span class="status-badge" :class="getStatusColor(user.status)">
                    {{ getStatusText(user.status) }}
                  </span>
                </td>
                <td class="date-cell">{{ user.lastConnection }}</td>
                <td>
                  <div class="actions">
                    <button class="action-btn view" title="Voir">
                      <Eye :size="16" />
                    </button>
                    <button class="action-btn edit" title="Éditer">
                      <Edit :size="16" />
                    </button>
                    <button
                      class="action-btn star"
                      :title="user.status === 'active' ? 'Désactiver le compte' : 'Activer le compte'"
                      @click="user.status === 'active' ? deactivateAccount(index) : activateAccount(index)"
                    >
                      <Star v-if="user.status !== 'active'" :size="16" />
                      <Lock v-else :size="16" />
                    </button>
                    <button class="action-btn delete" title="Supprimer">
                      <Trash2 :size="16" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <Transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">
              <Plus :size="24" />
              <span>Ajouter une Nouvelle Organisation</span>
            </h2>
            <button @click="closeModal" class="modal-close" title="Fermer">
              <X :size="24" />
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addOrganization" class="user-form">
              <!-- Informations de base -->
              <div class="form-section">
                <h3 class="section-title">
                  <Building2 :size="20" />
                  Informations de l'organisation
                </h3>
                
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Nom de l'organisation *</label>
                    <input type="text" v-model="organizationData.organizationName" class="form-input" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Type d'organisation *</label>
                    <select v-model="organizationData.organizationType" class="form-input" required>
                      <option value="" disabled>Sélectionnez un type</option>
                      <option value="mobile_operator">Opérateur Mobile</option>
                      <option value="financial_institution">Institution Financière</option>
                    </select>
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Adresse email *</label>
                    <input type="email" v-model="organizationData.email" class="form-input" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Téléphone *</label>
                    <input type="tel" v-model="organizationData.phone" class="form-input" required>
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Avatar</label>
                  <input type="file" @change="handleAvatarUpload" class="form-input" accept="image/*">
                  <div v-if="organizationData.avatarPreview" class="avatar-preview">
                    <img :src="organizationData.avatarPreview" alt="Aperçu avatar" class="avatar-preview-img">
                  </div>
                </div>
              </div>

  
              <div class="form-section">
                <h3 class="section-title">
                  <Shield :size="20" />
                  Permissions et accès
                </h3>
                <p class="section-description">
                  Sélectionnez les modules auxquels cet utilisateur aura accès
                </p>
                
                <div class="permissions-header">
                  <button 
                    type="button" 
                    @click="selectAllPermissions" 
                    class="btn-select-all"
                    :class="{ 'all-selected': organizationData.permissions.length === availablePermissions.length }"
                  >
                    <Check :size="16" />
                    {{ organizationData.permissions.length === availablePermissions.length ? 'Désélectionner tout' : 'Sélectionner tout' }}
                  </button>
                  <span class="permissions-count">
                    {{ organizationData.permissions.length }}/{{ availablePermissions.length }} sélectionnée(s)
                  </span>
                </div>

                <div class="permissions-grid">
                  <div 
                    v-for="permission in availablePermissions" 
                    :key="permission.key" 
                    class="permission-card"
                    :class="{ 'selected': organizationData.permissions.includes(permission.key) }"
                    @click="togglePermission(permission.key)"
                  >
                    <div class="permission-header">
                      <div class="permission-icon">
                        <component :is="permission.icon" :size="20" />
                      </div>
                      <div class="permission-checkbox">
                        <input 
                          type="checkbox" 
                          :checked="organizationData.permissions.includes(permission.key)"
                          @change="togglePermission(permission.key)"
                          @click.stop
                        >
                      </div>
                    </div>
                    <h4 class="permission-name">{{ permission.name }}</h4>
                    <p class="permission-description">{{ permission.description }}</p>
                  </div>
                </div>

                <div v-if="organizationData.permissions.length === 0" class="permissions-warning">
                  <AlertTriangle :size="16" />
                  <span>Veuillez sélectionner au moins une permission pour continuer</span>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" @click="closeModal" class="btn btn-secondary" title="Annuler">
                  Annuler
                </button>
                <button type="submit" class="btn btn-primary" :disabled="!isFormValid" title="Valider">
                  <Plus :size="16" />
                  Créer l'utilisateur
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
    <!-- Notification -->
    <Transition name="notification">
      <div v-if="notification.show" class="notification" :class="notification.type">
        <div class="notification-content">
          <Check :size="20" class="notification-icon" />
          <span class="notification-message">{{ notification.message }}</span>
          <button @click="closeNotification" class="notification-close" title="Fermer">
            <X :size="20" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.user-management {
  min-height: 100vh;
  background: #f8fafc;
  margin-left: 1.6%;
  margin-top: 2%;
}
.header {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 4rem 0;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}
.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.header-actions {
  display: flex;
  gap: 2rem;
}
.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-secondary {
  background: rgb(2, 2, 99);
  color: white;
  border: 1px solid;
}
.btn-secondary:hover:not(:disabled) {
  transform: translateY(-1px);
}
.btn-primary {
  background: #022ea7;
  color: white;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.39);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.stat-card:nth-child(1) { border-left-color: #3b82f6; }
.stat-card:nth-child(2) { border-left-color: #10b981; }
.stat-card:nth-child(3) { border-left-color: #f59e0b; }
.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stat-title {
  font-size: 1.1rem;
  color: #40444e;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.stat-icon.blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.stat-icon.green { background: linear-gradient(135deg, #10b981, #059669); }
.stat-icon.orange { background: linear-gradient(135deg, #f59e0b, #d97706); }
.filters-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}
.search-bar {
  position: relative;
  flex: 1;
  min-width: 300px;
}
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}
.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}
.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.filters {
  display: flex;
  gap: 1rem;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.filter-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
}
.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
}
.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.table-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}
.table-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}
.table-wrapper {
  overflow-x: auto;
}
.users-table {
  width: 100%;
  border-collapse: collapse;
}
.users-table th {
  background: #f9fafb;
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
}
.table-row {
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s ease;
}
.table-row:hover {
  background: #f9fafb;
}
.users-table td {
  padding: 1rem 1.5rem;
  vertical-align: middle;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  overflow: hidden;
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.avatar-initials {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}
.user-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}
.user-email {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}
.user-phone {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}
.user-role {
  color: #9ca3af;
  font-size: 0.75rem;
}
.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}
.type-badge.operator {
  background: #dbeafe;
  color: #1d4ed8;
}
.type-badge.institution {
  background: #f0fdf4;
  color: #166534;
}
.institution-cell {
  font-weight: 500;
  color: #374151;
}

/* Permissions dans le tableau */
.permissions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  max-width: 200px;
}
.permission-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #374151;
}
.no-permissions {
  color: #9ca3af;
  font-size: 0.75rem;
  font-style: italic;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.date-cell {
  color: #6b7280;
  font-size: 0.875rem;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.action-btn.view {
  background: #f3f4f6;
  color: #6b7280;
}
.action-btn.view:hover {
  background: #e5e7eb;
  color: #374151;
}
.action-btn.edit {
  background: #dbeafe;
  color: #1d4ed8;
}
.action-btn.edit:hover {
  background: #bfdbfe;
}
.action-btn.star {
  background: #fef3c7;
  color: #d97706;
}
.action-btn.star:hover {
  background: #fde68a;
}
.action-btn.delete {
  background: #fee2e2;
  color: #dc2626;
}
.action-btn.delete:hover {
  background: #fecaca;
}
/* Modal Styles */
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
.modal-container {
  background: white;
  border-radius: 16px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
}
.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  color: #6b7280;
  transition: all 0.2s ease;
}
.modal-close:hover {
  background: #e5e7eb;
  color: #374151;
}
.modal-body {
  padding: 2rem;
  max-height: 70vh;
  overflow-y: auto;
}

/* Form Sections */
.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}
.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.section-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.form-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}
.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;
}
.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Permissions Section */
.permissions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}
.btn-select-all {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-select-all:hover {
  background: #2563eb;
}
.btn-select-all.all-selected {
  background: #dc2626;
}
.btn-select-all.all-selected:hover {
  background: #b91c1c;
}
.permissions-count {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}
.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}
.permission-card {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}
.permission-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}
.permission-card.selected {
  border-color: #3b82f6;
  background: #f0f9ff;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}
.permission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.permission-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.permission-card.selected .permission-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}
.permission-checkbox input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.permission-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}
.permission-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
}
.permissions-warning {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}
.avatar-preview {
  margin-top: 0.5rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e5e7eb;
}
.avatar-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* Notification Styles */
.notification {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1100;
  max-width: 400px;
}
.notification.success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px -3px rgba(16, 185, 129, 0.3);
}
.notification-content {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.notification-message {
  flex: 1;
  font-weight: 500;
  font-size: 0.875rem;
}
.notification-close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s ease;
}
.notification-close:hover {
  background: rgba(255, 255, 255, 0.2);
}
/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}
.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
/* Responsive Design */
@media (max-width: 1024px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }
  .permissions-grid {
    grid-template-columns: 1fr;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }
  .search-bar {
    min-width: auto;
  }
  .filters {
    justify-content: space-between;
  }
  .form-actions {
    flex-direction: column;
  }
  .notification {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
  .users-table {
    font-size: 0.875rem;
  }
  .users-table th,
  .users-table td {
    padding: 0.75rem 1rem;
  }
  .permissions-list {
    max-width: 150px;
  }
}
@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }
  .modal-body {
    padding: 1.5rem;
  }
  .permissions-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
}
</style>