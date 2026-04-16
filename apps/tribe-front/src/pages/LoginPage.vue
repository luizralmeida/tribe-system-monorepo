<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { LogIn, Lock, Mail, Loader2 } from 'lucide-vue-next';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  if (!email.value || !password.value) return;
  
  isLoading.value = true;
  error.value = '';
  
  const success = await authStore.login({ email: email.value, password: password.value });
  
  if (success) {
    router.push({ name: 'dashboard' });
  } else {
    error.value = 'Credenciais inválidas. Tente novamente.';
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
    <div class="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-primary-600 dark:text-primary-400">Tribe</h1>
        <p class="mt-2 text-slate-500 dark:text-slate-400">Entre para gerenciar seus eventos</p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="block w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Senha</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="block w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <Loader2 v-if="isLoading" class="h-5 w-5 animate-spin" />
            <LogIn v-else class="h-5 w-5 text-primary-200 group-hover:text-primary-100" />
          </span>
          {{ isLoading ? 'Entrando...' : 'Acessar Sistema' }}
        </button>
      </form>
    </div>
  </div>
</template>
