<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  Users, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Zap,
  Globe
} from 'lucide-vue-next';

const router = useRouter();

const navigateToRestrictedArea = () => {
  router.push({ name: 'restrictedArea' });
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2 group cursor-pointer">
          <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
            <Sparkles class="text-white w-6 h-6" />
          </div>
          <span class="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">Tribe</span>
        </div>

        <div class="flex items-center gap-4">
          <button 
            @click="navigateToRestrictedArea"
            class="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Área restrita
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="pt-32 pb-20 px-6">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 relative">
          <!-- Decorative Glow -->
          <div class="absolute -top-20 -left-20 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
          
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-bold border border-primary-200/50 dark:border-primary-800/50">
            <Zap class="w-4 h-4" />
            <span>Sistema Web de Gestão de Eventos</span>
          </div>

          <h1 class="text-6xl lg:text-7xl font-black tracking-tight leading-none">
            Transforme seu <br/>
            <span class="text-primary-600">Evento</span> em <br/>
            Comunidade.
          </h1>

          <p class="text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            A plataforma definitiva para gerenciar organizadores, convidados e experiências memoráveis com tecnologia de ponta.
          </p>

          <div class="flex flex-wrap gap-4">
            <button class="px-8 py-4 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-2xl flex items-center gap-2 hover:opacity-90 transition-all group">
              Começar agora
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div class="relative">
          <!-- Abstract Visual/Dashboard Preview Placeholder -->
          <div class="relative z-10 p-8 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-2xl border border-white/20 dark:border-slate-700/50 backdrop-blur-xl">
             <div class="grid grid-cols-2 gap-4">
                <div v-for="i in 4" :key="i" class="aspect-square rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 p-4 flex flex-col justify-between group hover:border-primary-500 transition-colors">
                   <div class="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center">
                      <component :is="[Users, Calendar, ShieldCheck, Globe][i-1]" class="w-5 h-5 text-primary-600" />
                   </div>
                   <div class="space-y-1">
                      <div class="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                      <div class="h-2 w-10 bg-slate-100 dark:bg-slate-600 rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>
          <!-- Background Decoration -->
          <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      </div>
    </main>

    <!-- Features Section -->
    <section class="py-24 px-6 bg-white dark:bg-slate-900 transition-colors">
      <div class="max-w-7xl mx-auto">
        <div class="text-center space-y-4 mb-20">
          <h2 class="text-4xl font-black tracking-tight">Recursos da Plataforma</h2>
          <p class="text-slate-500 max-w-2xl mx-auto">Tudo o que você precisa para levar a gestão do seu sistema ao próximo nível.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
           <div v-for="(feature, idx) in [
             { title: 'Gestão de Convites', desc: 'Controle total sobre convites e acompanhantes com fluxos simplificados.', icon: Users },
             { title: 'Painel Gerencial', desc: 'Visão 360 do seu evento em tempo real com métricas precisas.', icon: Zap },
             { title: 'Segurança Total', desc: 'Protocolos de segurança avançados para proteção de dados e acessos.', icon: ShieldCheck }
           ]" :key="idx" class="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <component :is="feature.icon" class="w-7 h-7 text-primary-600" />
              </div>
              <h3 class="text-xl font-bold mb-3">{{ feature.title }}</h3>
              <p class="text-slate-500 leading-relaxed">{{ feature.desc }}</p>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>
