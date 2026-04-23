<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Zap,
  Globe,
  Rocket,
  QrCode,
  Smartphone,
  LayoutDashboard,
  CheckCircle2,
  Ticket
} from 'lucide-vue-next';
import fullLogo from '@/assets/full-logo.svg';

const router = useRouter();

const navigateToRestrictedArea = () => {
  router.push({ name: 'restrictedArea' });
};

const features = [
  { 
    title: 'RSVP Inteligente', 
    desc: 'O convidado confirma presença em segundos via web, sem baixar nada.', 
    icon: CheckCircle2 
  },
  { 
    title: 'Acesso via QR Code', 
    desc: 'Check-in ultra-rápido e seguro com validação individual por convidado.', 
    icon: QrCode 
  },
  { 
    title: 'Dashboard Organizador', 
    desc: 'Visão 360° em tempo real de quem já chegou e quem falta no seu evento.', 
    icon: LayoutDashboard 
  },
  { 
    title: 'App Checker', 
    desc: 'Equipe de portaria equipada com scanner mobile eficiente.', 
    icon: Smartphone 
  },
  { 
    title: 'Gestão de Acompanhantes', 
    desc: 'Controle completo de dependentes vinculados ao convidado principal.', 
    icon: Users 
  },
  { 
    title: 'Segurança de Elite', 
    desc: 'Controle de acesso granular (RBAC) para produtores e checkers.', 
    icon: ShieldCheck 
  }
];

const audiences = [
  { name: 'Produtores de Eventos', desc: 'Controle total e profissionalismo.' },
  { name: 'Casas Noturnas', desc: 'Entrada rápida e sem filas.' },
  { name: 'Eventos Sociais', desc: 'Elegância e organização impecável.' },
  { name: 'Promoters', desc: 'Gestão ágil de listas exclusivas.' }
];
</script>

<template>
  <div class="min-h-screen bg-[#020617] text-slate-50 selection:bg-primary-500/30 overflow-x-hidden font-sans">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center group cursor-pointer">
          <img :src="fullLogo" alt="Presença VIP" class="h-10 w-auto transition-transform group-hover:scale-105" />
        </div>

        <div class="flex items-center gap-6">
          <a href="#funciona" class="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors">Como funciona</a>
          <a href="#recursos" class="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors">Recursos</a>
          <button 
            @click="navigateToRestrictedArea"
            class="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-full shadow-lg shadow-primary-600/20 transition-all active:scale-95 border border-primary-400/20"
          >
            Área Restrita
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-40 pb-24 px-6">
      <!-- Background Glows -->
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] animate-glow"></div>
      <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-glow" style="animation-delay: -2s"></div>

      <div class="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-float">
          <Rocket class="w-4 h-4 text-primary-400" />
          <span class="text-xs font-bold uppercase tracking-widest text-primary-200">A nova era dos eventos VIP</span>
        </div>

        <h1 class="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
          Controle Total <br/>
          Experiência <span class="text-primary-500">Elite</span>.
        </h1>

        <p class="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
          A plataforma definitiva para produtores que não aceitam menos que a perfeição. Gestão de convidados, RSVP automatizado e check-in via QR Code com tecnologia de ponta.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <button class="px-10 py-5 bg-white text-slate-950 font-black rounded-full flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-white/10 group">
            Começar Grátis
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button @click="navigateToRestrictedArea" class="px-10 py-5 glass hover:bg-white/10 text-white font-bold rounded-full transition-all">
            Acessar Painel
          </button>
        </div>

        <!-- Hero UI Preview -->
        <div class="mt-24 w-full max-w-5xl relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div class="relative glass rounded-[2.5rem] overflow-hidden">
             <div class="p-8 md:p-12 bg-gradient-to-br from-slate-900/50 to-transparent">
                <div class="grid md:grid-cols-3 gap-6">
                   <div v-for="(card, i) in [
                     { icon: Users, label: 'Gerencie seus convidados', desc: 'Controle total sobre sua lista VIP.', color: 'text-primary-400' },
                     { icon: Ticket, label: 'Gere seus convites', desc: 'Emissão instantânea de QR Codes.', color: 'text-emerald-400' },
                     { icon: Zap, label: 'Automatize seu processo', desc: 'RSVP e check-in sem atritos.', color: 'text-blue-400' }
                   ]" :key="i" class="h-48 glass rounded-3xl p-6 flex flex-col justify-between border-white/5 hover:border-white/10 transition-colors">
                      <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                         <component :is="card.icon" class="w-6 h-6" :class="card.color" />
                      </div>
                      <div class="space-y-1">
                         <div class="text-xl font-black text-white leading-tight">{{ card.label }}</div>
                         <div class="text-xs text-slate-500 font-medium">{{ card.desc }}</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section id="funciona" class="py-32 px-6 border-y border-white/5 bg-slate-950/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-24">
          <h2 class="text-4xl md:text-5xl font-black mb-6">Eficiência em Cada Etapa</h2>
          <p class="text-slate-400 max-w-xl mx-auto">Do convite ao check-in, tudo integrado em um fluxo sem atrito para você e seu convidado.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-16 relative">
          <!-- Connector Lines (Desktop) -->
          <div class="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
          
          <div v-for="(step, i) in [
            { icon: Globe, title: 'RSVP via Web', desc: 'O convidado confirma pelo celular sem instalar aplicativos.' },
            { icon: QrCode, title: 'Geração de Ticket', desc: 'QR Code instantâneo para o convidado e seus acompanhantes.' },
            { icon: Smartphone, title: 'Check-in Mobile', desc: 'Validação na portaria rápida com o app Checker exclusivo.' }
          ]" :key="i" class="relative flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-[2rem] glass flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform bg-primary-900/30 border-primary-500/30">
              <component :is="step.icon" class="w-8 h-8 text-primary-300" />
              <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-xs font-black ring-4 ring-[#020617]">
                {{ i + 1 }}
              </div>
            </div>
            <h3 class="text-xl font-bold mb-4">{{ step.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="recursos" class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div class="max-w-2xl">
            <h2 class="text-4xl md:text-5xl font-black mb-6">Recursos Premium</h2>
            <p class="text-slate-400 text-lg">Criado por especialistas em eventos para quem exige controle total e segurança absoluta.</p>
          </div>
          <button class="px-8 py-4 glass hover:bg-white/5 rounded-2xl text-sm font-bold transition-all border-white/10 shrink-0">
            Ver todas as funções
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, idx) in features" :key="idx" class="p-8 rounded-[2rem] glass-card group border-white/5">
            <div class="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <component :is="feature.icon" class="w-7 h-7 text-primary-400" />
            </div>
            <h3 class="text-xl font-bold mb-4">{{ feature.title }}</h3>
            <p class="text-slate-500 leading-relaxed text-sm">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Audience/Persona Section -->
    <section class="py-32 px-6 bg-primary-600/5 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div class="space-y-12">
            <h2 class="text-4xl md:text-5xl font-black leading-tight">Escolha de quem <br/> faz acontecer.</h2>
            <div class="grid gap-8">
              <div v-for="audience in audiences" :key="audience.name" class="flex items-start gap-5">
                <div class="mt-1 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                  <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                </div>
                <div>
                  <h4 class="font-bold text-lg text-white mb-1">{{ audience.name }}</h4>
                  <p class="text-slate-400 text-sm">{{ audience.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
             <div class="absolute -inset-20 bg-primary-600/20 rounded-full blur-[100px]"></div>
             <div class="relative aspect-square glass rounded-[3rem] p-12 flex items-center justify-center">
                <div class="text-center">
                   <div class="w-24 h-24 rounded-full bg-white/5 mx-auto mb-6 flex items-center justify-center">
                      <Sparkles class="w-10 h-10 text-primary-400 animate-pulse" />
                   </div>
                   <div class="text-4xl font-black mb-2">+500k</div>
                   <div class="text-slate-500 uppercase tracking-widest text-xs font-bold">Check-ins realizados</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-32 px-6">
      <div class="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center bg-gradient-to-br from-primary-600 to-indigo-700">
        <div class="absolute inset-0 opacity-20 animate-bg-pan bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div class="relative z-10">
          <h2 class="text-4xl md:text-6xl font-black mb-8 text-white">Pronto para elevar o <br/> nível do seu evento?</h2>
          <p class="text-primary-100 text-lg mb-12 max-w-xl mx-auto opacity-90">Junte-se aos melhores organizadores e garanta uma experiência única para seus convidados.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="px-10 py-5 bg-white text-primary-600 font-black rounded-full hover:scale-105 transition-all shadow-2xl shadow-black/20">
              Começar Agora
            </button>
            <button class="px-10 py-5 bg-primary-700/50 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-primary-700/70 transition-all">
              Falar com Consultor
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 border-t border-white/5 text-center">
      <div class="max-w-7xl mx-auto">
        <img :src="fullLogo" alt="Presença VIP" class="h-8 w-auto mx-auto mb-8 opacity-50 grayscale hover:grayscale-0 transition-all" />
        <p class="text-slate-600 text-sm">&copy; 2026 Presença VIP. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Scoped styles if needed, but using Tailwind classes + style.css globals */
</style>
