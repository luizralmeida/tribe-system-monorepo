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
  Share2,
  Copy,
  Check
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

onMounted(async () => {
  try {
    guest.value = await guestService.getGuestById(guestId);
  } catch (err: any) {
    error.value = 'Houve um problema ao carregar as informações do seu convite.';
  } finally {
    isLoading.value = false;
  }
});

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
        <!-- Event Card -->
        <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div class="bg-primary-600 p-8 text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10">
              <QrCode class="w-40 h-40" />
            </div>
            <div class="relative z-10 space-y-2">
              <h1 class="text-3xl font-black">{{ guest.event.name }}</h1>
              <div class="flex items-center gap-2 opacity-90 text-sm">
                <Calendar class="w-4 h-4" />
                {{ formatDate(guest.event.date) }}
              </div>
            </div>
          </div>

          <div class="p-8 space-y-8 text-center">
            <div v-if="guest.event.address" class="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400">
              <div class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-1">
                <MapPin class="w-6 h-6 text-primary-600" />
              </div>
              <p class="font-bold text-slate-900 dark:text-white">{{ guest.event.address.street }}, {{ guest.event.address.number }}</p>
              <p class="text-sm">{{ guest.event.address.neighborhood }} - {{ guest.event.address.city }}/{{ guest.event.address.state }}</p>
            </div>

            <!-- RSVP Status / Actions -->
            <div v-if="guest.status === 'NOT_CONFIRMED' && !isUpdating" class="space-y-4">
              <p class="text-lg font-bold text-slate-800 dark:text-white">Você confirma sua presença?</p>
              <div class="grid grid-cols-2 gap-4">
                <button 
                  @click="handleRSVP('CONFIRMED')"
                  class="flex flex-col items-center gap-3 p-6 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-black rounded-3xl border-2 border-transparent hover:border-emerald-500 transition-all"
                >
                  <CheckCircle2 class="w-8 h-8" />
                  Confirmar
                </button>
                <button 
                  @click="handleRSVP('NOT_COMING')"
                  class="flex flex-col items-center gap-3 p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-black rounded-3xl border-2 border-transparent hover:border-red-500 transition-all"
                >
                  <XCircle class="w-8 h-8" />
                  Não irei
                </button>
              </div>
            </div>

            <div v-else-if="isUpdating" class="py-10 flex flex-col items-center gap-4">
              <Loader2 class="w-10 h-10 text-primary-600 animate-spin" />
              <p class="text-slate-500 font-bold uppercase tracking-widest text-xs">Atualizando sua resposta...</p>
            </div>

            <!-- Confirmed State -->
            <div v-else-if="guest.status === 'CONFIRMED'" class="space-y-8">
              <div class="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
                <div class="flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400 mb-2">
                  <CheckCircle2 class="w-6 h-6" />
                  <span class="text-xl font-black">Presença Confirmada!</span>
                </div>
                <p class="text-slate-500 dark:text-slate-400 text-sm">Apresente o código abaixo na entrada do evento.</p>
              </div>

              <div v-if="qrCode" class="space-y-4">
                <div class="bg-white p-4 rounded-3xl inline-block shadow-lg border border-slate-100">
                  <img :src="qrCode" alt="Ticket QR Code" class="w-48 h-48" />
                </div>
                <div class="flex items-center justify-center gap-4">
                  <button @click="copyLink" class="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-all">
                    <component :is="showCopied ? Check : Copy" class="w-5 h-5" />
                  </button>
                  <button class="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-all">
                    <Share2 class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button @click="handleRSVP('NOT_COMING')" class="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider">
                Alterar resposta para "Não irei"
              </button>
            </div>

            <!-- Not Coming State -->
            <div v-else-if="guest.status === 'NOT_COMING'" class="space-y-6 py-4">
              <div class="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart class="w-10 h-10 text-slate-300" />
              </div>
              <div class="space-y-2">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white">Obrigado pela resposta!</h3>
                <p class="text-slate-500 dark:text-slate-400">Sua ausência foi registrada. Caso mude de ideia, você pode alterar sua resposta abaixo.</p>
              </div>
              <button 
                @click="handleRSVP('CONFIRMED')"
                class="px-8 py-4 bg-primary-600 text-white font-black rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all w-full"
              >
                Mudei de ideia, EU VOU!
              </button>
            </div>
          </div>
        </div>

        <!-- Guest Info Card -->
        <div class="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
           <h4 class="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 ml-1">Dados do Convidado</h4>
           <div class="space-y-4">
             <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
               <span class="text-slate-500 text-sm">Nome</span>
               <span class="font-bold text-slate-900 dark:text-white">{{ guest.name }}</span>
             </div>
             <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
               <span class="text-slate-500 text-sm">Telefone</span>
               <span class="font-bold text-slate-900 dark:text-white">{{ guest.phone }}</span>
             </div>
             <div v-if="guest.companionCount > 0" class="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl">
               <span class="text-primary-600 dark:text-primary-400 text-sm font-bold">Acompanhantes</span>
               <span class="font-black text-primary-600 dark:text-primary-400">+{{ guest.companionCount }}</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
