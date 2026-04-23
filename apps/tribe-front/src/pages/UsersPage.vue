<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { userService } from '../services/user.service';
import { Plus, Pencil, Trash2, Shield, User, Mail, Search } from 'lucide-vue-next';
import type { User as UserType } from '../types';
import UserFormModal from '../components/UserFormModal.vue';

const users = ref<UserType[]>([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const selectedUser = ref<UserType | null>(null);
const searchQuery = ref('');

const fetchUsers = async () => {
  try {
    const response = await userService.findAll({ search: searchQuery.value } as any);
    users.value = response.data;
  } catch (error) {
    console.error('Failed to fetch users', error);
  }
};

const handleEdit = (user: UserType | null) => {
  selectedUser.value = user;
  isModalOpen.value = true;
};

const handleDelete = async (id: number) => {
  if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
  try {
    await userService.delete(id);
    fetchUsers();
  } catch (error) {
    console.error('Failed to delete user', error);
  }
};

const handleSuccess = () => {
  isModalOpen.value = false;
  fetchUsers();
};

onMounted(async () => {
  isLoading.value = true;
  await fetchUsers();
  isLoading.value = false;
});
</script>

<template>
  <div class="space-y-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div class="space-y-2">
        <h2 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Gestão de Staff</h2>
        <p class="text-slate-500 dark:text-slate-400 font-medium">Controle o acesso e as permissões da sua equipe.</p>
      </div>
      <button
        @click="handleEdit(null)"
        class="btn-primary flex items-center gap-2 group"
      >
        <Plus class="w-5 h-5 transition-transform group-hover:rotate-90" />
        <span>Novo Administrador</span>
      </button>
    </div>

    <!-- Search Area -->
    <div class="glass border border-white/10 dark:border-white/5 p-4 rounded-3xl">
      <div class="relative group">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
        <input
          v-model="searchQuery"
          @input="fetchUsers"
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          class="input-premium pl-12 bg-transparent border-none focus:ring-0"
        />
      </div>
    </div>

    <!-- Users Table Card -->
    <div class="glass-card overflow-hidden border border-white/10 dark:border-white/5">
      <div v-if="isLoading" class="flex justify-center py-20">
         <div class="animate-spin rounded-full h-14 w-14 border-t-4 border-primary-600 border-r-transparent"></div>
      </div>
      
      <div v-else-if="users.length === 0" class="text-center py-20">
        <div class="bg-slate-100 dark:bg-white/5 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
          <User class="w-10 h-10 text-slate-400" />
        </div>
        <p class="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-xs">Nenhum administrador encontrado</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.1em]">
              <th class="px-8 py-5">Colaborador</th>
              <th class="px-8 py-5">E-mail</th>
              <th class="px-8 py-5">Nível de Acesso</th>
              <th class="px-8 py-5 text-right">Controles</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-white/5">
            <tr v-for="user in users" :key="user.id" class="group hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors">
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-primary-600/5 flex items-center justify-center text-primary-600 font-black">
                     {{ user.name.charAt(0) }}
                  </div>
                  <p class="font-black text-slate-900 dark:text-white text-lg tracking-tight">{{ user.name }}</p>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                  <Mail class="w-4 h-4" />
                  {{ user.email }}
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center gap-2">
                  <Shield :class="[
                    'w-4 h-4',
                    user.role === 'SUPER' ? 'text-primary-600' : 'text-slate-400'
                  ]" />
                  <span :class="[
                    'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border',
                    user.role === 'SUPER' ? 'bg-primary-500/10 text-primary-600 border-primary-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10'
                  ]">
                    {{ user.role }}
                  </span>
                </div>
              </td>
              <td class="px-8 py-6 text-right">
                <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    @click="handleEdit(user)"
                    class="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-600/10 rounded-xl transition-all"
                    title="Editar"
                  >
                    <Pencil class="w-4 h-4" />
                  </button>
                  <button 
                    @click="handleDelete(user.id)"
                    class="p-2.5 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-xl transition-all"
                    title="Remover"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- User Form Modal -->
    <UserFormModal
      v-if="isModalOpen"
      :user="selectedUser"
      @close="isModalOpen = false"
      @success="handleSuccess"
    />
  </div>
</template>
