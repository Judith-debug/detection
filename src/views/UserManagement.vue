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
  Check
} from 'lucide-vue-next';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'mobile_operator' | 'financial_institution';
  institution: string;
  status: 'active' | 'pending' | 'inactive';
  lastConnection: string;
  avatar: string;
}

interface OrganizationData {
  organizationName: string;
  organizationType: 'mobile_operator' | 'financial_institution' | '';
  registrationNumber: string;
  email: string;
  website: string;
}

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
  website: ''
});

const users = ref<User[]>([
  {
    id: '1',
    name: 'Marie Kabore',
    email: 'marie.kabore@orange.ci',
    type: 'mobile_operator',
    institution: 'Orange Money',
    status: 'active',
    lastConnection: '15/01/2024',
    avatar: 'MK'
  },
  {
    id: '2',
    name: 'Jean Kouassi',
    email: 'jean.kouassi@mtn.ci',
    type: 'mobile_operator',
    institution: 'MTN Mobile Money',
    status: 'active',
    lastConnection: '14/01/2024',
    avatar: 'JK'
  },
  {
    id: '3',
    name: 'Fatou Diallo',
    email: 'fatou.diallo@ecobank.com',
    type: 'financial_institution',
    institution: 'Ecobank',
    status: 'pending',
    lastConnection: '12/01/2024',
    avatar: 'FD'
  },
  {
    id: '4',
    name: 'Ahmed Ben Ali',
    email: 'ahmed.benali@sgbci.com',
    type: 'financial_institution',
    institution: 'Société Générale',
    status: 'inactive',
    lastConnection: '10/01/2024',
    avatar: 'AB'
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
         organizationData.registrationNumber &&
         organizationData.email;
});

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         user.institution.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = selectedType.value === 'all' || user.type === selectedType.value;
    const matchesStatus = selectedStatus.value === 'all' || user.status === selectedStatus.value;
    return matchesSearch && matchesType && matchesStatus;
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
  organizationData.website = '';
};

const addOrganization = () => {
  if (!isFormValid.value) return;
  const newUser: User = {
    id: Date.now().toString(),
    name: organizationData.organizationName,
    email: organizationData.email,
    type: organizationData.organizationType as 'mobile_operator' | 'financial_institution',
    institution: organizationData.organizationName,
    status: 'pending',
    lastConnection: new Date().toLocaleDateString('fr-FR'),
    avatar: organizationData.organizationName.split(' ').map(n => n[0]).join('').toUpperCase()
  };
  users.value.unshift(newUser);
  closeModal();
};

const activateAccount = async (index: number) => {
  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:3000/activate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: users.value[index].email,
      }),
    });
    if (response.ok) {
      users.value[index].status = 'active';
      notification.value = {
        show: true,
        message: `Compte activé avec succès ! Un email de connexion a été envoyé à ${users.value[index].email}`,
        type: 'success'
      };
    } else {
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
    const response = await fetch('http://localhost:3000/deactivate', {
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

const closeNotification = () => {
  notification.value.show = false;
};
</script>

<template>
  <div class="user-management">
    <!-- Header -->
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
                <th>Statut</th>
                <th>Dernière connexion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in filteredUsers" :key="user.id" class="table-row">
                <td>
                  <div class="user-info">
                    <div class="user-avatar">{{ user.avatar }}</div>
                    <div class="user-details">
                      <p class="user-name">{{ user.name }}</p>
                      <p class="user-email">{{ user.email }}</p>
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
              <div class="form-group">
                <label class="form-label">Nom de l'organisation *</label>
                <input type="text" v-model="organizationData.organizationName" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Type d'organisation *</label>
                <select v-model="organizationData.organizationType" class="form-input" required>
                  <option value="" disabled>Sélectionnez un type</option>
                  <option value="mobile_operator">📱 Opérateur Mobile</option>
                  <option value="financial_institution">🏦 Institution Financière</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Numéro d'enregistrement *</label>
                <input type="text" v-model="organizationData.registrationNumber" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Adresse email *</label>
                <input type="email" v-model="organizationData.email" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Site web</label>
                <input type="url" v-model="organizationData.website" class="form-input">
              </div>
              <div class="form-actions">
                <button type="button" @click="closeModal" class="btn btn-secondary" title="Annuler">
                  Annuler
                </button>
                <button type="submit" class="btn btn-primary" :disabled="!isFormValid" title="Valider">
                  Valider
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
  max-width: 900px;
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
  max-height: 60vh;
  overflow-y: auto;
}
.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  background: #f9fafb;
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
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
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
  .modal-footer {
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
}
@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }
  .modal-body {
    padding: 1.5rem;
  }
}
</style>
