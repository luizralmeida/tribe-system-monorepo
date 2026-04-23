<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Ticket, LogIn, ArrowLeft } from 'lucide-vue-next';
import horizontalFullLogo from '@/assets/horizontal-full-logo.svg';
import iconLogo from '@/assets/icon-logo.svg';

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
  <div class="min-h-screen bg-slate-50 dark:bg-[#020617] flex flex-col items-center justify-center p-6 relative transition-colors duration-500">
    <!-- Background Decoration -->
    <div class="absolute top-1/4 -left-20 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] animate-glow pointer-events-none"></div>
    <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] animate-glow pointer-events-none" style="animation-delay: -2s"></div>

    <!-- Back Button -->
    <button 
      @click="goBack"
      class="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-all group px-5 py-2.5 rounded-2xl glass shadow-sm"
    >
      <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      <span class="font-bold text-sm tracking-tight">Página Inicial</span>
    </button>

    <div class="w-full max-w-4xl space-y-16 relative z-10">
      <div class="text-center space-y-6">
        <img :src="horizontalFullLogo" alt="Presença VIP" class="h-12 w-auto mx-auto mb-8 transition-transform hover:scale-105" />
        <h1 class="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
          Área <span class="text-primary-600">Restrita</span>
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-lg mx-auto">Selecione seu canal de entrada no sistema Presença VIP.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-10">
        <!-- Guest Access Option -->
        <button 
          @click="goToGuestAccess"
          class="group relative p-12 glass-card text-left flex flex-col justify-between overflow-hidden active:scale-[0.98]"
        >
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors"></div>
          
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
            <Ticket class="w-8 h-8 text-primary-600" />
          </div>

          <div>
            <h2 class="text-2xl font-black mb-4 text-slate-900 dark:text-white">Sou Convidado</h2>
            <p class="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-medium">
              Acesse sua reserva, confirme sua presença e obtenha seu QR Code exclusivo.
            </p>
            <div class="flex items-center gap-2 text-primary-600 font-black group/btn text-lg">
              Acessar Convite
              <div class="w-8 h-8 rounded-full bg-primary-600/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                <ArrowLeft class="w-4 h-4 rotate-180" />
              </div>
            </div>
          </div>
        </button>

        <!-- Login Access Option -->
        <button 
          @click="goToLogin"
          class="group relative p-12 glass-card text-left flex flex-col justify-between overflow-hidden active:scale-[0.98]"
        >
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>

          <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
            <LogIn class="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div>
            <h2 class="text-2xl font-black mb-4 text-slate-900 dark:text-white">Sou Organizador</h2>
            <p class="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-medium">
              Painel administrativo para produtores, promoters e equipe de check-in.
            </p>
            <div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black group/btn text-lg">
              Entrar no Painel
              <div class="w-8 h-8 rounded-full bg-indigo-600/10 dark:bg-indigo-400/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                <ArrowLeft class="w-4 h-4 rotate-180" />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
