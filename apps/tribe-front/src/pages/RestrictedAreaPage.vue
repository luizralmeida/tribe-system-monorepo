<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Ticket, LogIn, ArrowLeft } from 'lucide-vue-next';

const router = useRouter();

const goBack = () => {
  router.push({ name: 'home' });
};

const goToGuestAccess = () => {
  router.push({ name: 'guestAccess' });
};

const goToLogin = () => {
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative">
    <!-- Back Button -->
    <button 
      @click="goBack"
      class="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors group px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      <span class="font-medium text-sm">Voltar</span>
    </button>

    <div class="w-full max-w-4xl space-y-12">
      <div class="text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Área <span class="text-primary-600">Restrita</span>
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-lg">Selecione como deseja acessar o sistema</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Guest Access Option -->
        <button 
          @click="goToGuestAccess"
          class="group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-primary-500/50 transition-all text-left flex flex-col justify-between overflow-hidden active:scale-[0.98]"
        >
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors"></div>
          
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Ticket class="w-8 h-8 text-primary-600" />
          </div>

          <div>
            <h2 class="text-2xl font-black mb-3 text-slate-900 dark:text-white">Tenho um convite</h2>
            <p class="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Acesse sua reserva e confirme seus dados e de seus acompanhantes de forma rápida.
            </p>
            <div class="flex items-center gap-2 text-primary-600 font-bold group/btn">
              Acessar
              <div class="w-6 h-6 rounded-full bg-primary-600/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                <ArrowLeft class="w-3 h-3 rotate-180" />
              </div>
            </div>
          </div>
        </button>

        <!-- Login Access Option -->
        <button 
          @click="goToLogin"
          class="group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/50 transition-all text-left flex flex-col justify-between overflow-hidden active:scale-[0.98]"
        >
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>

          <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <LogIn class="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div>
            <h2 class="text-2xl font-black mb-3 text-slate-900 dark:text-white">Quero usar o sistema</h2>
            <p class="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Acesso gerencial para administradores e organizadores de eventos do ecossistema.
            </p>
            <div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold group/btn">
              Entrar
              <div class="w-6 h-6 rounded-full bg-indigo-600/10 dark:bg-indigo-400/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                <ArrowLeft class="w-3 h-3 rotate-180" />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
