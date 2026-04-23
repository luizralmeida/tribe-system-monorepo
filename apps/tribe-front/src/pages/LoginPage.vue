<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { LogIn, Lock, Mail, Loader2, ArrowLeft } from 'lucide-vue-next';
import iconLogo from '@/assets/icon-logo.svg';

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

const goBack = () => {
  router.push({ name: 'restrictedArea' });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] p-6 transition-colors duration-500 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] animate-glow pointer-events-none"></div>
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] animate-glow pointer-events-none" style="animation-delay: -2s"></div>

    <div class="w-full max-w-md relative z-10">
      <!-- Back Link -->
      <button 
        @click="goBack"
        class="mb-8 flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors group text-sm font-bold"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Voltar para seleção
      </button>

      <div class="glass-card p-10 md:p-12 border border-white/10 dark:border-white/5">
        <div class="text-center mb-10">
          <img :src="iconLogo" alt="Presença VIP" class="h-10 w-auto mx-auto mb-6" />
          <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Acesso de Staff</h1>
          <p class="mt-2 text-slate-500 dark:text-slate-400 font-medium">Informe suas credenciais administrativas</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-5">
            <div>
              <label for="email" class="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">E-mail</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail class="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="input-premium pl-12"
                  placeholder="admin@presencavip.com"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Senha de Acesso</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  class="input-premium pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div v-if="error" class="text-danger text-sm text-center font-bold bg-danger/10 p-3 rounded-2xl animate-shake">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3"
          >
            <Loader2 v-if="isLoading" class="h-5 w-5 animate-spin" />
            <LogIn v-else class="h-5 w-5" />
            <span>{{ isLoading ? 'Autenticando...' : 'Acessar Painel' }}</span>
          </button>
        </form>
      </div>

      <p class="mt-12 text-center text-slate-500 text-sm font-medium">
        Problemas com seu acesso? <a href="https://wa.me/5531991967276" target="_blank" class="text-primary-600 font-bold hover:underline">Fale com o suporte.</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
