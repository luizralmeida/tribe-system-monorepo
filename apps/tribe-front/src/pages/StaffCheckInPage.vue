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

const selectedIds = ref<number[]>([]);

onMounted(async () => {
  try {
    guest.value = await guestService.getGuestById(guestId);
    if (guest.value) {
      // Default selection: only those not yet attended
      if (!guest.value.attended) {
        selectedIds.value.push(guest.value.id);
      }
      
      const companions = guest.value.companions || [];
      companions.forEach(c => {
        if (!c.attended) {
          selectedIds.value.push(c.id);
        }
      });
    }
  } catch (err: any) {
    error.value = 'Houve um problema ao carregar as informações do convidado.';
  } finally {
    isLoading.value = false;
  }
});

const toggleSelection = (id: number) => {
  const index = selectedIds.value.indexOf(id);
  if (index === -1) {
    selectedIds.value.push(id);
  } else {
    selectedIds.value.splice(index, 1);
  }
};

const handleCheckIn = async () => {
  if (selectedIds.value.length === 0) {
    error.value = 'Selecione pelo menos uma pessoa para realizar o check-in.';
    return;
  }

  isCheckingIn.value = true;
  error.value = '';
  try {
    const companionIds = selectedIds.value.filter(id => id !== guestId);
    await guestService.checkIn(guestId, companionIds);
    
    success.value = true;
    if (guest.value) {
      if (selectedIds.value.includes(guest.value.id)) {
        guest.value.attended = true;
      }
      
      const companions = guest.value.companions || [];
      companions.forEach(c => {
        if (selectedIds.value.includes(c.id)) {
          c.attended = true;
        }
      });
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

      <div v-else-if="error && !guest" class="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-4">
        <div class="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle class="w-10 h-10 text-red-500" />
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">{{ error || 'Convidado não encontrado.' }}</h2>
        <button @click="router.push({ name: 'adminDashboard' })" class="px-8 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all">
          Voltar ao Início
        </button>
      </div>

      <div v-else-if="guest" class="space-y-6">
        <!-- Success State -->
        <div v-if="success" class="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-2xl border border-emerald-100 dark:border-emerald-900/30 text-center space-y-6">
          <div class="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 class="w-12 h-12 text-emerald-500" />
          </div>
          <div class="space-y-2">
            <h2 class="text-3xl font-black text-slate-900 dark:text-white">Entrada Confirmada!</h2>
            <p class="text-slate-500 dark:text-slate-400">
              Check-in de <strong>{{ selectedIds.length }}</strong> {{ selectedIds.length === 1 ? 'pessoa' : 'pessoas' }} realizado com sucesso.
            </p>
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

            <!-- Seleção de Integrantes -->
            <div class="space-y-4">
              <div class="flex items-center justify-between px-2">
                <h3 class="text-lg font-black text-slate-900 dark:text-white">Integrantes do Grupo</h3>
                <span class="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                  {{ selectedIds.length }} selecionados
                </span>
              </div>

              <div class="space-y-3">
                <!-- Convidado Principal -->
                <div 
                  @click="!guest.attended && toggleSelection(guest.id)"
                  :class="[
                    'p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group',
                    guest.attended ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 opacity-60' : 
                    selectedIds.includes(guest.id) ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800 shadow-lg shadow-primary-500/5' : 
                    'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800'
                  ]"
                >
                  <div class="flex items-center gap-4">
                    <div :class="[
                      'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors',
                      selectedIds.includes(guest.id) ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    ]">
                      <User class="w-6 h-6" />
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {{ guest.name }}
                        <span class="text-[10px] font-black uppercase tracking-tighter bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-2 py-0.5 rounded">Principal</span>
                      </h4>
                      <p class="text-xs text-slate-500">{{ guest.phone }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span v-if="guest.attended" class="text-emerald-500 flex items-center gap-1 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                      <CheckCircle2 class="w-3 h-3" />
                      Presente
                    </span>
                    <div v-else :class="[
                      'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all',
                      selectedIds.includes(guest.id) ? 'bg-primary-600 border-primary-600' : 'border-slate-200 dark:border-slate-700'
                    ]">
                      <CheckCircle2 v-if="selectedIds.includes(guest.id)" class="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                <!-- Acompanhantes -->
                <div 
                  v-for="companion in guest.companions" 
                  :key="companion.id"
                  @click="!companion.attended && toggleSelection(companion.id)"
                  :class="[
                    'p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group',
                    companion.attended ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 opacity-60' : 
                    selectedIds.includes(companion.id) ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800 shadow-lg shadow-primary-500/5' : 
                    'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800'
                  ]"
                >
                  <div class="flex items-center gap-4">
                    <div :class="[
                      'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors',
                      selectedIds.includes(companion.id) ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    ]">
                      <User class="w-6 h-6" />
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {{ companion.name }}
                        <span v-if="companion.isChild" class="text-[10px] font-black uppercase tracking-tighter bg-amber-500 text-white px-2 py-0.5 rounded">Criança</span>
                      </h4>
                      <p class="text-xs text-slate-500">Acompanhante</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span v-if="companion.attended" class="text-emerald-500 flex items-center gap-1 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                      <CheckCircle2 class="w-3 h-3" />
                      Presente
                    </span>
                    <div v-else :class="[
                      'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all',
                      selectedIds.includes(companion.id) ? 'bg-primary-600 border-primary-600' : 'border-slate-200 dark:border-slate-700'
                    ]">
                      <CheckCircle2 v-if="selectedIds.includes(companion.id)" class="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
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

            <div v-if="error" class="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold text-center">
              {{ error }}
            </div>

            <!-- Action Button -->
            <button 
              @click="handleCheckIn"
              :disabled="isCheckingIn || selectedIds.length === 0"
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
