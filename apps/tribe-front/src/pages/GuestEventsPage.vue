<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { guestService, type GuestEvent } from '../services/guest.service';
import { Calendar, MapPin, ArrowLeft, ArrowRight, Loader2, PartyPopper } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const phone = route.query.phone as string;

const guests = ref<GuestEvent[]>([]);
const isLoading = ref(true);
const error = ref('');

onMounted(async () => {
  if (!phone) {
    router.push({ name: 'guestAccess' });
    return;
  }

  try {
    guests.value = await guestService.findByPhone(phone);
    if (guests.value.length === 0) {
      error.value = 'Nenhum convite encontrado para este número.';
    }
  } catch (err: any) {
    error.value = 'Erro ao buscar convites. Tente novamente mais tarde.';
  } finally {
    isLoading.value = false;
  }
});

const goToRSVP = (guestId: number) => {
  router.push({ name: 'guestRSVP', params: { id: guestId } });
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center">
    <div class="w-full max-w-4xl space-y-8">
      <button 
        @click="router.push({ name: 'guestAccess' })"
        class="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors group"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span class="font-medium">Voltar</span>
      </button>

      <div class="space-y-2">
        <h1 class="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Seus <span class="text-primary-600">Convites</span></h1>
        <p class="text-slate-500 dark:text-slate-400">Encontramos os seguintes eventos associados ao seu número.</p>
      </div>

      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 class="w-12 h-12 text-primary-600 animate-spin" />
        <p class="text-slate-500 font-medium">Buscando convites...</p>
      </div>

      <div v-else-if="error" class="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-4">
        <div class="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
          <PartyPopper class="w-10 h-10 text-red-500 grayscale opacity-50" />
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">{{ error }}</h2>
        <button @click="router.push({ name: 'guestAccess' })" class="px-8 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all">
          Tentar outro número
        </button>
      </div>

      <div v-else class="grid gap-6">
        <div 
          v-for="guest in guests" 
          :key="guest.id"
          class="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-lg border border-slate-100 dark:border-slate-800 hover:border-primary-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Calendar class="w-8 h-8 text-primary-600" />
            </div>
            <div class="space-y-1">
              <h3 class="text-2xl font-black text-slate-900 dark:text-white">{{ guest.event.name }}</h3>
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                  <Calendar class="w-4 h-4" />
                  {{ formatDate(guest.event.date) }}
                </div>
                <div v-if="guest.event.address" class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                  <MapPin class="w-4 h-4" />
                  {{ guest.event.address.city }}, {{ guest.event.address.state }}
                </div>
              </div>
              <div class="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                :class="{
                  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400': guest.status === 'CONFIRMED',
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': guest.status === 'NOT_COMING',
                  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': guest.status === 'NOT_CONFIRMED'
                }"
              >
                {{ 
                  guest.status === 'CONFIRMED' ? 'Confirmado' : 
                  guest.status === 'NOT_COMING' ? 'Não irá' : 'Pendente' 
                }}
              </div>
            </div>
          </div>

          <button 
            @click="goToRSVP(guest.id)"
            class="px-8 py-4 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group/btn"
          >
            Ver Convite
            <ArrowRight class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
