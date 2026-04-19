<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Phone, ArrowLeft, ArrowRight, Loader2 } from 'lucide-vue-next';

const router = useRouter();
const phoneNumber = ref('');
const isLoading = ref(false);

const goBack = () => {
  router.push({ name: 'restrictedArea' });
};

const handleAccess = async () => {
  if (phoneNumber.value.length >= 10) {
    router.push({ 
      name: 'guestEvents', 
      query: { phone: phoneNumber.value } 
    });
  }
};

// Simple phone mask directive or watcher could be added here
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Abstract Background Decorations -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

    <div class="w-full max-w-md relative z-10">
      <button 
        @click="goBack"
        class="mb-8 flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors group"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span class="font-medium">Voltar</span>
      </button>

      <div class="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-8">
        <div class="space-y-2">
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6">
            <Phone class="w-8 h-8 text-primary-600" />
          </div>
          <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Confirmar presença</h1>
          <p class="text-slate-500 dark:text-slate-400">Insira seu número de telefone para acessar.</p>
        </div>

        <form @submit.prevent="handleAccess" class="space-y-6">
          <div class="space-y-2">
            <label for="phone" class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Telefone</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone class="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                id="phone"
                v-model="phoneNumber"
                type="tel"
                required
                class="block w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading || !phoneNumber"
            class="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl shadow-xl shadow-primary-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group active:scale-[0.98]"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
            <template v-else>
              Confirmar presença
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </template>
          </button>
        </form>

        <p class="text-center text-xs text-slate-400 dark:text-slate-500">
          Ao prosseguir, você concorda com nossos termos de uso e política de privacidade.
        </p>
      </div>
    </div>
  </div>
</template>
