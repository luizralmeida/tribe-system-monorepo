<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, RefreshCw, Zap, ZapOff } from 'lucide-vue-next';

const props = defineProps<{
  onScan: (decodedText: string) => void;
  onClose: () => void;
}>();

const scannerElementId = 'qr-reader';
const html5QrCode = ref<Html5Qrcode | null>(null);
const isFlashOn = ref(false);
const hasFlash = ref(false);
const activeCameraId = ref<string | null>(null);
const cameras = ref<{ id: string; label: string }[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const devices = await Html5Qrcode.getCameras();
    if (devices && devices.length > 0) {
      cameras.value = devices.map(d => ({ id: d.id, label: d.label }));
      activeCameraId.value = devices[devices.length - 1].id; // Usually back camera
      startScanner();
    } else {
      error.value = 'Nenhuma câmera encontrada.';
    }
  } catch (err) {
    error.value = 'Erro ao acessar a câmera. Verifique as permissões.';
    console.error(err);
  }
});

const startScanner = async () => {
  if (!activeCameraId.value) return;

  html5QrCode.value = new Html5Qrcode(scannerElementId);
  try {
    await html5QrCode.value.start(
      activeCameraId.value,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      (decodedText) => {
        props.onScan(decodedText);
        stopScanner();
      },
      () => {
        // Silently ignore scan errors
      }
    );

    // Check for torch capability
    const capabilities = html5QrCode.value.getRunningTrackCapabilities() as any;
    hasFlash.value = !!capabilities.torch;
  } catch (err) {
    error.value = 'Erro ao iniciar o scanner.';
    console.error(err);
  }
};

const stopScanner = async () => {
  if (html5QrCode.value && html5QrCode.value.isScanning) {
    await html5QrCode.value.stop();
  }
};

const switchCamera = async () => {
  if (cameras.value.length < 2) return;
  
  await stopScanner();
  const currentIndex = cameras.value.findIndex(c => c.id === activeCameraId.value);
  const nextIndex = (currentIndex + 1) % cameras.value.length;
  activeCameraId.value = cameras.value[nextIndex].id;
  startScanner();
};

const toggleFlash = async () => {
  if (!html5QrCode.value || !hasFlash.value) return;
  
  isFlashOn.value = !isFlashOn.value;
  await html5QrCode.value.applyVideoConstraints({
    advanced: [{ torch: isFlashOn.value } as any]
  });
};

onUnmounted(async () => {
  await stopScanner();
});
</script>

<template>
  <div class="fixed inset-0 z-[100] bg-black flex flex-col">
    <!-- Header -->
    <div class="p-6 flex items-center justify-between z-10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
          <Camera class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-white font-bold text-lg">Scanner de QR Code</h2>
          <p class="text-slate-400 text-xs">Aponte para o código do convidado</p>
        </div>
      </div>
      <button 
        @click="onClose"
        class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <X class="w-6 h-6" />
      </button>
    </div>

    <!-- Scanner Container -->
    <div class="flex-1 relative flex items-center justify-center overflow-hidden">
      <div :id="scannerElementId" class="w-full h-full max-w-md"></div>
      
      <!-- Overlay -->
      <div class="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
        <div class="w-[280px] h-[280px] border-2 border-primary-500/50 rounded-[2rem] relative">
          <!-- Corners -->
          <div class="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-primary-500 rounded-tl-2xl"></div>
          <div class="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-primary-500 rounded-tr-2xl"></div>
          <div class="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-primary-500 rounded-bl-2xl"></div>
          <div class="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-primary-500 rounded-br-2xl"></div>
          
          <!-- Scanning Line Animation -->
          <div class="absolute top-0 left-0 w-full h-[2px] bg-primary-500 shadow-[0_0_15px_rgba(37,99,235,0.8)] animate-scan"></div>
        </div>
        
        <p class="mt-12 text-white/70 text-sm font-medium animate-pulse">Scanning...</p>
      </div>

      <div v-if="error" class="absolute inset-x-6 top-1/2 -translate-y-1/2 bg-red-500/90 text-white p-6 rounded-3xl text-center shadow-2xl">
        <p class="font-bold mb-4">{{ error }}</p>
        <button @click="onClose" class="px-6 py-2 bg-white text-red-600 font-bold rounded-xl text-sm">Fechar</button>
      </div>
    </div>

    <!-- Footer Controls -->
    <div class="p-8 flex items-center justify-center gap-6 z-10">
      <button 
        v-if="hasFlash"
        @click="toggleFlash"
        class="w-16 h-16 rounded-full flex items-center justify-center transition-all bg-white/10 text-white active:scale-95"
        :class="isFlashOn ? 'bg-primary-600 text-white' : 'bg-white/10 text-white'"
      >
        <Zap v-if="!isFlashOn" class="w-7 h-7" />
        <ZapOff v-else class="w-7 h-7" />
      </button>

      <button 
        v-if="cameras.length > 1"
        @click="switchCamera"
        class="w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center active:scale-95 transition-all"
      >
        <RefreshCw class="w-7 h-7" />
      </button>
    </div>
  </div>
</template>

<style scoped>
#qr-reader {
  background: black !important;
  border: none !important;
}

#qr-reader :deep(video) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

@keyframes scan {
  0% { top: 0; }
  50% { top: 100%; }
  100% { top: 0; }
}

.animate-scan {
  animation: scan 3s infinite linear;
}
</style>
