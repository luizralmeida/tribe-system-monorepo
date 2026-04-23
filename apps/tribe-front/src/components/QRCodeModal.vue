<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Download } from 'lucide-vue-next';
// @ts-ignore
import QRCode from 'qrcode';
import { guestService, type GuestEvent } from '../services/guest.service';

interface Props {
  guestId: number;
}

const props = defineProps<Props>();
defineEmits(['close']);

const guest = ref<GuestEvent | null>(null);
const qrCodeDataUrl = ref('');
const isLoading = ref(true);
const error = ref('');

const generateQRCode = async () => {
  try {
    guest.value = await guestService.getGuestById(props.guestId);
    const url = `${window.location.origin}/admin/check-in/${props.guestId}`;
    qrCodeDataUrl.value = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#4f46e5',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error(err);
    error.value = 'Não foi possível carregar o QR Code.';
  } finally {
    isLoading.value = false;
  }
};

const downloadQR = () => {
  if (!qrCodeDataUrl.value) return;
  const link = document.createElement('a');
  link.download = `qrcode-guest-${props.guestId}.png`;
  link.href = qrCodeDataUrl.value;
  link.click();
};

onMounted(generateQRCode);
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-slate-950/40 backdrop-blur-md" @click="$emit('close')"></div>
    
    <div class="w-full max-w-sm relative animate-in fade-in zoom-in duration-300">
      <div class="glass-card p-10 border border-white/10 dark:border-white/5 shadow-2xl text-center bg-white/80 dark:bg-[#020617]/80 backdrop-blur-2xl">
        <div class="mb-10 text-center">
           <h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">QR Code VIP</h3>
           <p class="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">Acesso Exclusivo</p>
        </div>

        <div v-if="isLoading" class="py-20 flex flex-col items-center gap-4">
          <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-primary-600"></div>
          <p class="text-slate-500 font-bold italic text-sm">Gerando Passe...</p>
        </div>

        <div v-else-if="error" class="py-12 text-center text-danger font-black text-sm uppercase tracking-widest">
          {{ error }}
        </div>

        <div v-else class="space-y-10">
          <div class="text-center space-y-2">
            <p v-if="guest" class="text-xs font-black text-primary-600 uppercase tracking-[0.2em]">{{ guest.event.name }}</p>
            <h4 v-if="guest" class="text-2xl font-black text-slate-900 dark:text-white">{{ guest.name }}</h4>
          </div>

          <div class="relative group mx-auto w-64 h-64 p-4 glass rounded-[2.5rem] border border-primary-500/20 shadow-inner overflow-hidden">
             <div class="absolute inset-0 animate-pulse bg-primary-500/5 rounded-[2.5rem]"></div>
             <img 
              v-if="qrCodeDataUrl" 
              :src="qrCodeDataUrl" 
              alt="Check-in QR Code" 
              class="relative z-10 w-full h-full rounded-[1.5rem]" 
            />
          </div>

          <div class="flex flex-col gap-3">
            <button 
              @click="downloadQR"
              class="btn-primary w-full py-4 flex items-center justify-center gap-3"
            >
              <Download class="w-5 h-5" />
              <span>Baixar Convite</span>
            </button>
            <button 
              @click="$emit('close')"
              class="px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-black tracking-tight hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
