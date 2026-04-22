<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { guestService, type GuestEvent } from '../services/guest.service';
import { 
  CheckCircle2, 
  UserCheck, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  Loader2, 
  AlertTriangle,
  User
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const guestId = parseInt(route.params.id as string);

const guest = ref<GuestEvent | null>(null);
const isLoading = ref(true);
const isCheckingIn = ref(false);
const error = ref('');
const success = ref(false);

onMounted(async () => {
  try {
    guest.value = await guestService.getGuestById(guestId);
  } catch (err: any) {
    error.value = 'Houve um problema ao carregar as informações do convidado.';
  } finally {
    isLoading.value = false;
  }
});

const handleCheckIn = async () => {
  isCheckingIn.value = true;
  error.value = '';
  try {
    await guestService.checkIn(guestId);
    success.value = true;
    if (guest.value) {
      guest.value.attended = true;
    }
  } catch (err: any) {
    error.value = 'Não foi possível realizar o check-in. Tente novamente.';
  } finally {
    isCheckingIn.value = false;
  }
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const formatAddress = (address?: GuestEvent['event']['address']) => {
  if (!address) return 'Local não informado';
  return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`;
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center">
    <div class="w-full max-w-2xl space-y-8">
      <button 
        @click="guest ? router.push({ name: 'eventDashboard', params: { id: guest.event.id } }) : router.back()"
        class="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors group"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span class="font-medium">Voltar ao Evento</span>
      </button>

      <div class="space-y-2">
        <h1 class="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Check-in de <span class="text-primary-600">Convidado</span></h1>
        <p class="text-slate-500 dark:text-slate-400">Validação de entrada para o evento.</p>
      </div>

      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 class="w-12 h-12 text-primary-600 animate-spin" />
        <p class="text-slate-500 font-medium">Validando informações...</p>
      </div>

      <div v-else-if="error || !guest" class="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-4">
        <div class="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle class="w-10 h-10 text-red-500" />
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">{{ error || 'Convidado não encontrado.' }}</h2>
        <button @click="router.push({ name: 'adminDashboard' })" class="px-8 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all">
          Voltar ao Início
        </button>
      </div>

      <div v-else class="space-y-6">
        <!-- Success State -->
        <div v-if="success" class="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-2xl border border-emerald-100 dark:border-emerald-900/30 text-center space-y-6">
          <div class="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 class="w-12 h-12 text-emerald-500" />
          </div>
          <div class="space-y-2">
            <h2 class="text-3xl font-black text-slate-900 dark:text-white">Entrada Confirmada!</h2>
            <p class="text-slate-500 dark:text-slate-400">O check-in de <strong>{{ guest.name }}</strong> foi realizado com sucesso.</p>
          </div>
          <button 
            @click="router.push({ name: 'eventDashboard', params: { id: guest.event.id } })" 
            class="w-full py-4 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-2xl hover:opacity-90 transition-all"
          >
            Voltar ao Dashboard
          </button>
        </div>

        <div v-else class="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div class="p-8 space-y-8">
            <!-- Guest Header -->
            <div class="flex items-center gap-6">
              <div class="w-20 h-20 bg-primary-50 dark:bg-primary-900/20 rounded-[1.5rem] flex items-center justify-center shrink-0">
                <User class="w-10 h-10 text-primary-600" />
              </div>
              <div>
                <h3 class="text-2xl font-black text-slate-900 dark:text-white">{{ guest.name }}</h3>
                <p class="text-slate-500 font-medium">{{ guest.phone }}</p>
                <div class="mt-2 flex gap-2">
                  <span v-if="guest.isChild" class="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-lg">Criança</span>
                  <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded-lg">ID: {{ guest.id }}</span>
                </div>
              </div>
            </div>

            <!-- Event Context -->
            <div class="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl space-y-4">
              <div class="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Calendar class="w-5 h-5 text-primary-600" />
                <span class="font-bold text-slate-900 dark:text-white">{{ guest.event.name }}</span>
              </div>
              <div class="flex items-start gap-3 text-slate-500 dark:text-slate-400 text-sm">
                <MapPin class="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div class="space-y-1">
                  <p class="font-medium leading-tight">{{ formatAddress(guest.event.address) }}</p>
                  <p class="text-xs opacity-70">{{ formatDate(guest.event.date) }}</p>
                </div>
              </div>
            </div>

            <!-- Attendance Warning -->
            <div v-if="guest.attended" class="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex items-start gap-4">
              <AlertTriangle class="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-amber-800 dark:text-amber-400 font-bold">Já realizou check-in!</p>
                <p class="text-amber-700/70 dark:text-amber-400/70 text-sm">Este convidado já teve sua entrada confirmada anteriormente.</p>
              </div>
            </div>

            <!-- RSVP Status Warning -->
             <div v-if="guest.status !== 'CONFIRMED'" class="bg-red-50 dark:bg-red-900/10 p-6 rounded-3xl border border-red-100 dark:border-red-900/30 flex items-start gap-4">
              <AlertTriangle class="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-red-800 dark:text-red-400 font-bold">Presença Não Confirmada!</p>
                <p class="text-red-700/70 dark:text-red-400/70 text-sm">O convidado não confirmou presença através do RSVP (Status: {{ guest.status }}).</p>
              </div>
            </div>

            <div v-if="guest.companionCount > 0" class="flex items-center justify-between p-6 bg-primary-50 dark:bg-primary-900/10 rounded-3xl">
              <div class="space-y-1">
                <p class="text-primary-600 dark:text-primary-400 font-black text-lg">Acopanhantes: +{{ guest.companionCount }}</p>
                <p class="text-primary-700/70 dark:text-primary-400/70 text-xs">Certifique-se de que todos estão presentes.</p>
              </div>
              <UserCheck class="w-8 h-8 text-primary-600" />
            </div>

            <!-- Action Button -->
            <button 
              @click="handleCheckIn"
              :disabled="isCheckingIn"
              class="w-full py-5 bg-primary-600 hover:bg-primary-700 text-white font-black text-xl rounded-3xl shadow-2xl shadow-primary-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Loader2 v-if="isCheckingIn" class="w-6 h-6 animate-spin" />
              <UserCheck v-else class="w-7 h-7" />
              <span>{{ isCheckingIn ? 'Confirmando...' : 'Confirmar Entrada' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
