<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { X, Users, Baby, User, CheckCircle2, XCircle, Trash2, QrCode } from 'lucide-vue-next';
import { guestService } from '../services/guest.service';
import ConfirmationModal from './ConfirmationModal.vue';
import QRCodeModal from './QRCodeModal.vue';
import type { Guest } from '../types';
import { GuestStatus } from '../types';

interface Props {
  eventId: number;
  guest: Guest;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'refresh']);

const companions = ref<Guest[]>([]);
const isLoading = ref(true);
const error = ref('');

// Confirmation Modal State
const showConfirmModal = ref(false);
const confirmTitle = ref('');
const confirmMessage = ref('');
const confirmType = ref<'danger' | 'warning' | 'info'>('warning');
let onConfirmCallback: (() => Promise<void>) | null = null;

// QR Code Modal State
const showQRCodeModal = ref(false);
const qrCodeGuestId = ref<number | null>(null);

const fetchData = async () => {
  try {
    companions.value = await guestService.getCompanions(props.eventId, props.guest.id);
  } catch (err) {
    console.error('Failed to fetch companions', err);
    error.value = 'Erro ao carregar acompanhantes.';
  } finally {
    isLoading.value = false;
  }
};

const toggleStatus = (comp: Guest) => {
  const statuses = [GuestStatus.NOT_CONFIRMED, GuestStatus.CONFIRMED, GuestStatus.NOT_COMING];
  const currentIndex = statuses.indexOf(comp.status);
  const nextStatus = statuses[(currentIndex + 1) % statuses.length];
  const statusLabel = nextStatus === GuestStatus.CONFIRMED ? 'Confirmado' : nextStatus === GuestStatus.NOT_COMING ? 'Não vai' : 'Pendente';

  confirmTitle.value = 'Alterar Status';
  confirmMessage.value = `Deseja alterar o status de ${comp.name} para "${statusLabel}"?`;
  confirmType.value = 'warning';
  onConfirmCallback = async () => {
    try {
      await guestService.update(props.eventId, comp.id, { status: nextStatus });
      await fetchData();
      emit('refresh');
    } catch (err) {
      console.error('Failed to toggle companion status', err);
    }
  };
  showConfirmModal.value = true;
};

const toggleCheckIn = (comp: Guest) => {
  const nextAttended = !comp.attended;
  confirmTitle.value = nextAttended ? 'Realizar Check-in' : 'Remover Check-in';
  confirmMessage.value = `Deseja ${nextAttended ? 'confirmar a presença' : 'remover a presença'} de ${comp.name}?`;
  confirmType.value = nextAttended ? 'info' : 'danger';
  onConfirmCallback = async () => {
    try {
      await guestService.update(props.eventId, comp.id, { attended: nextAttended });
      await fetchData();
      emit('refresh');
    } catch (err) {
      console.error('Failed to toggle companion check-in', err);
    }
  };
  showConfirmModal.value = true;
};

const handleConfirm = async () => {
  if (onConfirmCallback) {
    await onConfirmCallback();
  }
  showConfirmModal.value = false;
  onConfirmCallback = null;
};

const openQRCodeModal = (comp: Guest) => {
  qrCodeGuestId.value = comp.id;
  showQRCodeModal.value = true;
};

const handleDeleteCompanion = async (comp: Guest) => {
  if (!confirm(`Tem certeza que deseja excluir o acompanhante ${comp.name}?`)) return;
  
  try {
    await guestService.delete(props.eventId, comp.id);
    await fetchData();
    emit('refresh');
  } catch (err) {
    console.error('Failed to delete companion', err);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div @click="emit('close')" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    
    <div class="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all scale-100">
      <div class="p-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
              <Users class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 class="text-xl font-extrabold text-slate-800 dark:text-white">Acompanhantes</h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm">De: {{ guest.name }}</p>
            </div>
          </div>
          <button @click="emit('close')" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <div v-if="isLoading" class="py-12 flex flex-col items-center justify-center space-y-4">
          <div class="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Carregando acompanhantes...</p>
        </div>

        <div v-else-if="error" class="py-8 text-center text-red-500">
          {{ error }}
        </div>

        <div v-else-if="companions.length === 0" class="py-12 text-center space-y-3">
          <div class="inline-flex p-4 bg-slate-50 dark:bg-slate-800/50 rounded-full">
            <Users class="w-8 h-8 text-slate-300 dark:text-slate-600" />
          </div>
          <p class="text-slate-400 text-sm italic">Nenhum acompanhante encontrado.</p>
        </div>

        <div v-else class="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <div v-for="comp in companions" :key="comp.id" class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-between group hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                <Baby v-if="comp.isChild" class="w-5 h-5 text-indigo-500" />
                <User v-else class="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p class="font-bold text-slate-800 dark:text-white">{{ comp.name }}</p>
                <div class="flex items-center gap-2 mt-0.5">
                   <div 
                     @click="toggleStatus(comp)"
                     :class="[
                       'px-2 py-0.5 text-[10px] font-bold rounded-lg uppercase tracking-wider cursor-pointer transition-all',
                       comp.status === GuestStatus.CONFIRMED ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' :
                       comp.status === GuestStatus.NOT_COMING ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                       'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                     ]"
                   >
                     {{ comp.status === GuestStatus.CONFIRMED ? 'Confirmado' : comp.status === GuestStatus.NOT_COMING ? 'Não vai' : 'Pendente' }}
                   </div>
                   <span v-if="comp.isChild" class="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">Criança</span>
                   <span v-if="comp.age" class="text-[10px] font-bold text-slate-400 uppercase">{{ comp.age }} anos</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button 
                v-if="comp.status === GuestStatus.CONFIRMED"
                @click="openQRCodeModal(comp)"
                class="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
                title="Ver QR Code"
              >
                <QrCode class="w-4 h-4" />
              </button>

              <button 
                @click="toggleCheckIn(comp)"
                :class="[
                  'p-2 rounded-xl transition-all',
                  comp.attended 
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                ]"
              >
                <CheckCircle2 v-if="comp.attended" class="w-5 h-5" />
                <XCircle v-else class="w-5 h-5" />
              </button>
              
              <button 
                @click="handleDeleteCompanion(comp)"
                class="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Excluir Acompanhante"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
           <button 
             @click="emit('close')"
             class="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
           >
             Fechar
           </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ConfirmationModal
      v-if="showConfirmModal"
      :title="confirmTitle"
      :message="confirmMessage"
      :type="confirmType"
      @confirm="handleConfirm"
      @cancel="showConfirmModal = false"
    />

    <QRCodeModal
      v-if="showQRCodeModal && qrCodeGuestId"
      :guest-id="qrCodeGuestId"
      @close="showQRCodeModal = false; qrCodeGuestId = null"
    />
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
}
</style>
