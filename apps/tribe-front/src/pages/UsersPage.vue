<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { userService } from '../services/user.service';
import { UserPlus, Edit, Trash2, Search, MoreVertical, Shield, ShieldCheck, User as UserIcon } from 'lucide-vue-next';
import UserFormModal from '../components/UserFormModal.vue';

const users = ref<any[]>([]);
const pagination = ref({ total: 0, page: 1, limit: 10 });
const isLoading = ref(true);
const isModalOpen = ref(false);
const selectedUser = ref<any>(null);
const searchQuery = ref('');

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const response = await userService.findAll({ 
      page: pagination.value.page, 
      limit: pagination.value.limit,
      search: searchQuery.value 
    });
    users.value = response.data;
    pagination.value.total = response.total;
  } catch (error) {
    console.error('Failed to fetch users', error);
  } finally {
    isLoading.value = false;
  }
};

const openCreateModal = () => {
  selectedUser.value = null;
  isModalOpen.value = true;
};

const openEditModal = (user: any) => {
  selectedUser.value = user;
  isModalOpen.value = true;
};

const handleDelete = async (id: number) => {
  if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
  
  try {
    await userService.delete(id);
    await fetchUsers();
  } catch (error) {
    alert('Erro ao excluir usuário.');
  }
};

const handleFormSuccess = () => {
  isModalOpen.value = false;
  fetchUsers();
};

onMounted(fetchUsers);
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white">Usuários</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Gerencie os administradores e organizadores do sistema.</p>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary-500/20"
      >
        <UserPlus class="w-5 h-5" />
        <span>Novo Usuário</span>
      </button>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          v-model="searchQuery"
          @input="fetchUsers"
          type="text"
          placeholder="Buscar por nome ou email..."
          class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-700 dark:text-slate-200"
        />
      </div>
    </div>

    <!-- Users List (Table on Desktop, Cards on Mobile) -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="users.length === 0" class="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
      <div class="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <UserIcon class="w-8 h-8 text-slate-400" />
      </div>
      <p class="text-slate-500 dark:text-slate-400">Nenhum usuário encontrado.</p>
    </div>

    <div v-else class="space-y-4">
      <!-- Desktop Table -->
      <div class="hidden md:block bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
              <th class="px-6 py-4 font-semibold">Usuário</th>
              <th class="px-6 py-4 font-semibold">Role</th>
              <th class="px-6 py-4 font-semibold">Status</th>
              <th class="px-6 py-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="font-semibold text-slate-800 dark:text-white">{{ user.name }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="[
                  'inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold leading-none',
                  user.role === 'SUPER' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                ]">
                  <ShieldCheck v-if="user.role === 'SUPER'" class="w-3 h-3" />
                  <Shield v-else class="w-3 h-3" />
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span :class="[
                  'w-2.5 h-2.5 rounded-full inline-block mr-2',
                  user.active ? 'bg-green-500 shadow-sm shadow-green-500/50' : 'bg-slate-300'
                ]"></span>
                <span class="text-sm font-medium" :class="user.active ? 'text-green-600' : 'text-slate-500'">{{ user.active ? 'Ativo' : 'Inativo' }}</span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end space-x-2">
                  <button @click="openEditModal(user)" class="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all">
                    <Edit class="w-5 h-5" />
                  </button>
                  <button @click="handleDelete(user.id)" class="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="md:hidden space-y-4">
        <div v-for="user in users" :key="user.id" class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xl">
                {{ user.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-bold text-slate-800 dark:text-white">{{ user.name }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ user.email }}</p>
              </div>
            </div>
            <button @click="openEditModal(user)" class="p-2 text-slate-400">
              <MoreVertical class="w-5 h-5" />
            </button>
          </div>
          
          <div class="mt-6 flex items-center justify-between">
            <span :class="[
                  'inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold',
                  user.role === 'SUPER' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                ]">
              {{ user.role }}
            </span>
            <div class="flex items-center space-x-3">
              <button @click="handleDelete(user.id)" class="text-red-500 text-sm font-semibold">Excluir</button>
              <button @click="openEditModal(user)" class="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200">Editar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Form Modal -->
    <UserFormModal
      v-if="isModalOpen"
      :user="selectedUser"
      @close="isModalOpen = false"
      @success="handleFormSuccess"
    />
  </div>
</template>
