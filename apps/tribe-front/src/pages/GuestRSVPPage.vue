<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { guestService, type GuestEvent } from '../services/guest.service';
import { 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  Loader2, 
  Heart,
  Copy,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const guestId = parseInt(route.params.id as string);

const guest = ref<GuestEvent | null>(null);
const qrCode = ref<string | null>(null);
const isLoading = ref(true);
const isUpdating = ref(false);
const error = ref('');
const showCopied = ref(false);
const collapsedStates = ref<Record<number, boolean>>({});

onMounted(async () => {
  try {
    guest.value = await guestService.getGuestById(guestId);
    if (guest.value) {
      // Parent guest starts expanded
      collapsedStates.value[guest.value.id] = false;
      // Companions start collapsed
      guest.value.companions?.forEach(c => {
        collapsedStates.value[c.id] = true;
      });
    }
  } catch (err: any) {
    error.value = 'Houve um problema ao carregar as informações do seu convite.';
  } finally {
    isLoading.value = false;
  }
});

const toggleCollapse = (id: number) => {
  collapsedStates.value[id] = !collapsedStates.value[id];
};

const handleRSVP = async (status: 'CONFIRMED' | 'NOT_COMING') => {
  isUpdating.value = true;
  error.value = '';
  try {
    const response = await guestService.updateStatus(guestId, status);
    if (guest.value) {
      guest.value.status = response.guest.status;
    }
    if (response.qrCode) {
      qrCode.value = response.qrCode;
    }
  } catch (err: any) {
    error.value = 'Não foi possível atualizar sua resposta. Tente novamente.';
  } finally {
    isUpdating.value = false;
  }
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

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  showCopied.value = true;
  setTimeout(() => showCopied.value = false, 2000);
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center">
    <div class="w-full max-w-2xl space-y-8">
      <button 
        @click="router.back()"
        class="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors group"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span class="font-medium">Voltar</span>
      </button>

      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 class="w-12 h-12 text-primary-600 animate-spin" />
        <p class="text-slate-500 font-medium">Carregando seu convite...</p>
      </div>

      <div v-else-if="error || !guest" class="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-4">
        <div class="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
          <XCircle class="w-10 h-10 text-red-500" />
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">{{ error || 'Convite não encontrado.' }}</h2>
        <button @click="router.push({ name: 'guestAccess' })" class="px-8 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all">
          Ir para Acesso
        </button>
      </div>

      <div v-else class="space-y-6">
        <!-- Top Summary -->
        <div v-if="guest.companionCount > 0" class="bg-primary-50 dark:bg-primary-900/10 p-4 rounded-2xl border border-primary-100 dark:border-primary-900/30 flex items-center gap-3">
          <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shrink-0">
            <Heart class="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p class="text-sm font-bold text-primary-900 dark:text-primary-100">Você e mais {{ guest.companionCount }} acompanhante(s)</p>
            <p class="text-xs text-primary-600 dark:text-primary-400">Confirme a presença de todos abaixo.</p>
          </div>
        </div>

        <!-- Guest Cards (Parent + Companions) -->
        <div v-for="currentGuest in [guest, ...(guest.companions || [])]" :key="currentGuest.id" 
          class="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300"
          :class="{ 'opacity-90 grayscale-[0.2]': collapsedStates[currentGuest.id] }"
        >
          <!-- Card Header (Always visible) -->
          <div 
            @click="toggleCollapse(currentGuest.id)"
            class="p-6 cursor-pointer flex items-center justify-between group"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                :class="currentGuest.status === 'CONFIRMED' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'"
              >
                <CheckCircle2 v-if="currentGuest.status === 'CONFIRMED'" class="w-6 h-6" />
                <Calendar v-else class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-xl font-black text-slate-900 dark:text-white">{{ currentGuest.name }}</h3>
                <p v-if="collapsedStates[currentGuest.id]" class="text-xs font-bold uppercase tracking-wider"
                  :class="currentGuest.status === 'CONFIRMED' ? 'text-emerald-600' : 'text-slate-400'"
                >
                  {{ currentGuest.status === 'CONFIRMED' ? 'Confirmado' : 'Pendente' }}
                </p>
              </div>
            </div>
            <div class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 transition-all">
              <component :is="collapsedStates[currentGuest.id] ? ChevronDown : ChevronUp" class="w-5 h-5" />
            </div>
          </div>

          <!-- Card Content (Minimizable) -->
          <div v-show="!collapsedStates[currentGuest.id]" class="border-t border-slate-50 dark:border-slate-800/50">
            <!-- Event Info (Shared Context) -->
            <div class="bg-primary-600 p-8 text-white relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4 opacity-10">
                <QrCode class="w-32 h-32" />
              </div>
              <div class="relative z-10 space-y-1">
                <h4 class="text-xs font-black uppercase tracking-[0.2em] opacity-80">Evento</h4>
                <h2 class="text-2xl font-black">{{ guest.event.name }}</h2>
                <div class="flex items-center gap-2 opacity-90 text-xs font-bold">
                  <Calendar class="w-3.5 h-3.5" />
                  {{ formatDate(guest.event.date) }}
                </div>
              </div>
            </div>

            <div class="p-8 space-y-8 text-center">
              <!-- Guest Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Telefone</p>
                  <p class="font-bold text-slate-900 dark:text-white">{{ currentGuest.phone }}</p>
                </div>
                <div v-if="currentGuest.email" class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">E-mail</p>
                  <p class="font-bold text-slate-900 dark:text-white truncate">{{ currentGuest.email }}</p>
                </div>
              </div>

              <!-- Address (Only in parent/main card or for better UX) -->
              <div v-if="guest.event.address" class="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400 pt-4">
                <div class="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-1">
                  <MapPin class="w-5 h-5 text-primary-600" />
                </div>
                <p class="font-bold text-slate-900 dark:text-white text-sm">{{ guest.event.address.street }}, {{ guest.event.address.number }}</p>
                <p class="text-[11px]">{{ guest.event.address.neighborhood }} - {{ guest.event.address.city }}/{{ guest.event.address.state }}</p>
              </div>

              <!-- RSVP Actions -->
              <div v-if="currentGuest.status === 'NOT_CONFIRMED' && !isUpdating" class="space-y-4 pt-4">
                <p class="text-base font-bold text-slate-800 dark:text-white">Confirma presença para {{ currentGuest.name }}?</p>
                <div class="grid grid-cols-2 gap-4">
                  <button 
                    @click="handleRSVP('CONFIRMED')"
                    class="flex flex-col items-center gap-2 p-5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-black rounded-3xl border-2 border-transparent hover:border-emerald-500 transition-all text-sm"
                  >
                    <CheckCircle2 class="w-6 h-6" />
                    Confirmar
                  </button>
                  <button 
                    @click="handleRSVP('NOT_COMING')"
                    class="flex flex-col items-center gap-2 p-5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-black rounded-3xl border-2 border-transparent hover:border-red-500 transition-all text-sm"
                  >
                    <XCircle class="w-6 h-6" />
                    Não irei
                  </button>
                </div>
              </div>

              <div v-else-if="currentGuest.id === guestId && isUpdating" class="py-6 flex flex-col items-center gap-4">
                <Loader2 class="w-10 h-10 text-primary-600 animate-spin" />
                <p class="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Atualizando...</p>
              </div>

              <!-- Confirmed State -->
              <div v-else-if="currentGuest.status === 'CONFIRMED'" class="space-y-6 pt-4">
                <div class="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
                  <div class="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                    <CheckCircle2 class="w-5 h-5" />
                    <span class="text-lg font-black">Presença Confirmada!</span>
                  </div>
                  <p class="text-slate-500 dark:text-slate-400 text-[11px]">Apresente o QR Code na entrada.</p>
                </div>

                <!-- QR Code (Currently only for parent as service returns one QR code, but in future could be per guest) -->
                <div v-if="currentGuest.id === guestId && qrCode" class="space-y-4">
                  <div class="bg-white p-4 rounded-3xl inline-block shadow-lg border border-slate-100">
                    <img :src="qrCode" alt="Ticket QR Code" class="w-40 h-40" />
                  </div>
                  <div class="flex items-center justify-center gap-4">
                    <button @click="copyLink" class="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-all">
                      <component :is="showCopied ? Check : Copy" class="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button v-if="currentGuest.id === guestId" @click="handleRSVP('NOT_COMING')" class="text-[10px] font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest mt-4">
                  Alterar resposta para "Não irei"
                </button>
              </div>

              <!-- Not Coming State -->
              <div v-else-if="currentGuest.status === 'NOT_COMING'" class="space-y-4 py-4">
                <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                  <Heart class="w-8 h-8 text-slate-300" />
                </div>
                <div class="space-y-1">
                  <h3 class="text-xl font-black text-slate-900 dark:text-white">Ausência registrada</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Mude de ideia a qualquer momento abaixo.</p>
                </div>
                <button 
                  @click="handleRSVP('CONFIRMED')"
                  class="px-6 py-3 bg-primary-600 text-white font-black rounded-2xl shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all w-full text-sm"
                >
                  Eu vou!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
