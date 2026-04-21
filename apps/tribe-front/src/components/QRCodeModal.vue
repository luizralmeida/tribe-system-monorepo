<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { X, Copy, Check, Loader2 } from 'lucide-vue-next';
import { guestService, type GuestEvent } from '../services/guest.service';

interface Props {
  guestId: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['close']);

const guest = ref<GuestEvent | null>(null);
const isLoading = ref(true);
const error = ref('');
const showCopied = ref(false);

onMounted(async () => {
  try {
    guest.value = await guestService.getGuestById(props.guestId);
  } catch (err) {
    error.value = 'Não foi possível carregar o QR Code.';
  } finally {
    isLoading.value = false;
  }
});

const copyCheckInLink = () => {
  if (guest.value) {
    const frontendUrl = window.location.origin;
    const checkInUrl = `${frontendUrl}/admin/check-in/${guest.value.id}`;
    navigator.clipboard.writeText(checkInUrl);
    showCopied.value = true;
    setTimeout(() => showCopied.value = false, 2000);
  }
};
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div @click="emit('close')" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    
    <div class="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-black text-slate-800 dark:text-white">QR Code de Check-in</h3>
          <button @click="emit('close')" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <div v-if="isLoading" class="py-20 flex flex-col items-center gap-4">
          <Loader2 class="w-12 h-12 text-primary-600 animate-spin" />
          <p class="text-slate-500 font-medium italic">Gerando QR Code...</p>
        </div>

        <div v-else-if="error" class="py-12 text-center text-red-500 font-bold">
          {{ error }}
        </div>

        <div v-else-if="guest" class="flex flex-col items-center space-y-8">
          <div class="text-center space-y-1">
            <p class="text-sm font-bold text-primary-600 uppercase tracking-widest">{{ guest.event.name }}</p>
            <h4 class="text-2xl font-black text-slate-900 dark:text-white">{{ guest.name }}</h4>
          </div>

          <div v-if="guest.qrCode" class="relative group">
            <div class="absolute -inset-4 bg-primary-100/50 dark:bg-primary-900/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
              <img :src="guest.qrCode" alt="Ticket QR Code" class="w-48 h-48" />
            </div>
          </div>

          <div v-else class="text-center py-8">
            <p class="text-slate-500 italic">O convidado precisa estar <span class="font-bold text-emerald-600">confirmado</span> para gerar o QR Code.</p>
          </div>

          <div v-if="guest.qrCode" class="flex items-center gap-4 w-full">
            <button 
              @click="copyCheckInLink"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-all"
            >
              <component :is="showCopied ? Check : Copy" class="w-5 h-5" />
              {{ showCopied ? 'Link Copiado' : 'Copiar Link' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
