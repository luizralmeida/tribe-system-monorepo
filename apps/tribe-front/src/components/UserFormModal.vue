<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { userService } from '../services/user.service';
import { X, Loader2, Save, User, Mail, Phone, Shield, Lock } from 'lucide-vue-next';

const props = defineProps({
  user: { type: Object, default: null }
});

const emit = defineEmits(['close', 'success']);

const formData = ref({
  name: '',
  email: '',
  phone: '',
  role: 'VIEW',
  password: '',
  active: true
});

const isLoading = ref(false);
const error = ref('');

onMounted(() => {
  if (props.user) {
    formData.value = {
      name: props.user.name,
      email: props.user.email,
      phone: props.user.phone,
      role: props.user.role,
      active: props.user.active,
      password: '' // Don't pre-fill password
    };
  }
});

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    if (props.user) {
      // For updates, password is optional
      const updateData = { ...formData.value };
      if (!updateData.password) delete (updateData as any).password;
      await userService.update(props.user.id, updateData);
    } else {
      if (!formData.value.password) {
        error.value = 'Senha é obrigatória para novos usuários.';
        isLoading.value = false;
        return;
      }
      await userService.create(formData.value);
    }
    emit('success');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao salvar usuário.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
    <div @click="emit('close')" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    
    <div class="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all">
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">
            {{ user ? 'Editar Usuário' : 'Novo Usuário' }}
          </h3>
          <button @click="emit('close')" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nome Completo</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.name" type="text" required placeholder="João Silva" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.email" type="email" required placeholder="joao@email.com" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Telefone</label>
              <div class="relative">
                <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.phone" type="text" required placeholder="(11) 99999-9999" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Permissão (Role)</label>
              <div class="relative">
                <Shield class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select v-model="formData.role" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white appearance-none">
                  <option value="VIEW">Vizualização (VIEW)</option>
                  <option value="EDIT">Edição (EDIT)</option>
                  <option value="SUPER">Administrador (SUPER)</option>
                </select>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Senha</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.password" type="password" :required="!user" placeholder="••••••••" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
              <p v-if="user" class="text-[10px] text-slate-400 ml-1">Deixe em branco para manter a senha atual.</p>
            </div>

            <div class="flex items-center space-x-3 sm:pt-6 ml-2">
              <input v-model="formData.active" type="checkbox" id="active" class="w-5 h-5 rounded-lg border-slate-200 text-primary-600 focus:ring-primary-500" />
              <label for="active" class="text-sm font-bold text-slate-700 dark:text-slate-300">Usuário Ativo</label>
            </div>
          </div>

          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-red-500 text-sm font-medium">
            {{ error }}
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              @click="emit('close')"
              class="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="flex-[2] bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-2xl font-extrabold transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center space-x-2"
            >
              <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
              <Save v-else class="w-5 h-5" />
              <span>{{ user ? 'Salvar Alterações' : 'Criar Usuário' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
