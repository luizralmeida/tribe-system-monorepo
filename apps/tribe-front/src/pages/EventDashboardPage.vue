<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { 
  CheckCircle2, 
  XCircle, 
  UserCheck,
  ChevronLeft,
  Search,
  Plus,
  Baby,
  Edit,
  Trash2,
  Users,
  QrCode,
  Phone,
  Camera
} from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { eventService } from '../services/event.service';
import { guestService } from '../services/guest.service';
import { useAuthStore } from '../store/auth';
import { UserRole } from '../types/enums';
import GuestFormModal from '../components/GuestFormModal.vue';
import CompanionsListModal from '../components/CompanionsListModal.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import QRCodeModal from '../components/QRCodeModal.vue';
import QrScanner from '../components/QrScanner.vue';
import type { Event, Guest, EventDashboardStats } from '../types';
import { GuestStatus } from '../types';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const eventId = Number(route.params.id);
const event = ref<Event | null>(null);
const stats = ref<EventDashboardStats | null>(null);
const guests = ref<Guest[]>([]);
const isLoading = ref(true);
const hasError = ref(false);
const searchQuery = ref('');
const showGuestModal = ref(false);
const selectedGuest = ref<Guest | null>(null);
const showCompanionsModal = ref(false);
const selectedGuestForCompanions = ref<Guest | null>(null);
const showScanner = ref(false);
const isMobile = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const canPerformCheckIn = authStore.user?.role === UserRole.SUPER || 
                         authStore.user?.role === UserRole.EDIT || 
                         authStore.user?.role === UserRole.CHECKER;

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
  hasError.value = false;
  try {
    const [eventData, statsData, guestsData] = await Promise.all([
      eventService.findById(eventId),
      guestService.getDashboard(eventId),
      guestService.findByEvent(eventId, { search: searchQuery.value, onlyPrimary: true } as any)
    ]);
    event.value = eventData;
    stats.value = statsData;
    guests.value = guestsData.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data', error);
    hasError.value = true;
  }
};

const toggleStatus = (guest: Guest) => {
  const statuses = [GuestStatus.NOT_CONFIRMED, GuestStatus.CONFIRMED, GuestStatus.NOT_COMING];
  const currentIndex = statuses.indexOf(guest.status);
  const nextStatus = statuses[(currentIndex + 1) % statuses.length];
  const statusLabel = nextStatus === GuestStatus.CONFIRMED ? 'Confirmado' : nextStatus === GuestStatus.NOT_COMING ? 'Não vai' : 'Pendente';

  confirmTitle.value = 'Alterar Status';
  confirmMessage.value = `Deseja alterar o status de ${guest.name} para "${statusLabel}"?`;
  confirmType.value = 'warning';
  onConfirmCallback = async () => {
    try {
      await guestService.update(eventId, guest.id, { status: nextStatus });
      await fetchData();
    } catch (error) {
      console.error('Failed to toggle status', error);
    }
  };
  showConfirmModal.value = true;
};

const toggleCheckIn = (guest: Guest) => {
  const nextAttended = !guest.attended;
  confirmTitle.value = nextAttended ? 'Realizar Check-in' : 'Remover Check-in';
  confirmMessage.value = `Deseja ${nextAttended ? 'confirmar a presença' : 'remover a presença'} de ${guest.name}?`;
  confirmType.value = nextAttended ? 'info' : 'danger';
  onConfirmCallback = async () => {
    try {
      await guestService.update(eventId, guest.id, { attended: nextAttended });
      await fetchData();
    } catch (error) {
      console.error('Failed to toggle check-in', error);
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

const openQRCodeModal = (guest: Guest) => {
  qrCodeGuestId.value = guest.id;
  showQRCodeModal.value = true;
};

const onGuestSuccess = () => {
  showGuestModal.value = false;
  selectedGuest.value = null;
  fetchData();
};

const handleViewCompanions = (guest: Guest) => {
  selectedGuestForCompanions.value = guest;
  showCompanionsModal.value = true;
};

const handleEditGuest = (guest: Guest) => {
  selectedGuest.value = guest;
  showGuestModal.value = true;
};

const handleDeleteGuest = async (guest: Guest) => {
  const message = guest.companionCount > 0 
    ? `Deseja realmente excluir ${guest.name} e todos os seus ${guest.companionCount} acompanhantes?`
    : `Deseja realmente excluir ${guest.name}?`;
    
  if (confirm(message)) {
    try {
      await guestService.delete(eventId, guest.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete guest', error);
    }
  }
};

onMounted(async () => {
  isLoading.value = true;
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
  await fetchData();
  isLoading.value = false;
});

const onQrScan = (data: string) => {
  const match = data.match(/\/check-in\/(\d+)/);
  const id = match ? match[1] : data;
  
  if (id) {
    showScanner.value = false;
    router.push({ name: 'staffCheckIn', params: { id } });
  }
};
</script>

<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div class="flex items-center gap-6">
        <router-link 
          to="/events" 
          class="p-4 glass rounded-2xl text-slate-500 hover:text-primary-600 transition-all hover:scale-105"
        >
          <ChevronLeft class="w-6 h-6" />
        </router-link>
        <div class="space-y-1">
          <h2 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {{ event ? event.name : `Dashboard` }}
          </h2>
          <p class="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Gerenciamento VIP de convidados e presença.</p>
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div v-for="(stat, idx) in [
        { label: 'Total', value: stats?.total || 0, icon: Users, color: 'text-slate-500 bg-slate-500/10' },
        { label: 'Confirmados', value: stats?.confirmed || 0, icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
        { label: 'Pendentes', value: stats?.notConfirmed || 0, icon: XCircle, color: 'text-amber-500 bg-amber-500/10' },
        { label: 'Presentes', value: stats?.attended || 0, icon: UserCheck, color: 'text-primary-500 bg-primary-500/10' },
        { label: 'Isentos', value: stats?.nonPayingChildrenCount || 0, icon: Baby, color: 'text-pink-500 bg-pink-500/10' }
      ]" :key="idx" class="glass-card p-6 border border-white/10 dark:border-white/5 group">
        <div class="flex flex-col gap-4">
          <div :class="[stat.color, 'w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110']">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{{ stat.label }}</p>
            <p class="text-3xl font-black text-slate-900 dark:text-white">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="space-y-6">
      <!-- Search & Add Actions -->
      <div class="glass border border-white/10 dark:border-white/5 p-4 rounded-3xl flex flex-col sm:flex-row gap-6 items-center">
        <div class="relative flex-1 w-full group">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            v-model="searchQuery"
            @input="fetchData"
            type="text"
            placeholder="Buscar convidado por nome..."
            class="input-premium pl-12 bg-transparent border-none focus:ring-0"
          />
        </div>
        <button 
          @click="showGuestModal = true"
          class="btn-primary flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center"
        >
          <Plus class="w-5 h-5" />
          <span>Novo Convidado</span>
        </button>
      </div>

      <!-- Guest Table Card -->
      <div class="glass-card overflow-hidden border border-white/10 dark:border-white/5">
        <div v-if="isLoading" class="flex justify-center py-20">
           <div class="animate-spin rounded-full h-14 w-14 border-t-4 border-primary-600 border-r-transparent"></div>
        </div>
        
        <div v-else-if="hasError" class="text-center py-20 px-10">
          <div class="bg-danger/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle class="w-10 h-10 text-danger" />
          </div>
          <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">Erro de conexão</h3>
          <p class="text-slate-500 dark:text-slate-400 font-medium mb-6">Não conseguimos sincronizar com o servidor.</p>
          <button @click="fetchData" class="btn-primary">Tentar Denovo</button>
        </div>

        <div v-else-if="guests.length === 0" class="text-center py-20">
          <div class="bg-slate-100 dark:bg-white/5 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
            <Users class="w-10 h-10 text-slate-400" />
          </div>
          <p class="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-xs">Vazio por enquanto</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.1em]">
                <th class="px-8 py-5">Identificação</th>
                <th class="px-8 py-5 text-center">Acompa.</th>
                <th class="px-8 py-5">Status</th>
                <th class="px-8 py-5 text-center">Presença</th>
                <th class="px-8 py-5 text-right">Controles</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-white/5">
              <tr v-for="guest in guests" :key="guest.id" class="group hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors">
                <td class="px-8 py-6">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-primary-600/5 flex items-center justify-center text-primary-600 font-black">
                       {{ guest.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-black text-slate-900 dark:text-white text-lg tracking-tight">{{ guest.name }}</p>
                      <div class="flex items-center gap-4 mt-1">
                        <a v-if="guest.phone" :href="`https://wa.me/55${guest.phone}`" target="_blank" class="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-500 transition-colors">
                           <Phone class="w-3.5 h-3.5" /> {{ guest.phone }}
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6 text-center">
                  <span class="inline-flex items-center justify-center min-w-[2rem] h-8 bg-slate-100 dark:bg-white/10 rounded-lg text-sm font-black text-slate-700 dark:text-slate-300">
                    {{ guest.companionCount }}
                  </span>
                </td>
                <td class="px-8 py-6">
                  <button 
                    @click="toggleStatus(guest)"
                    :class="[
                      'px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 border',
                      guest.status === GuestStatus.CONFIRMED ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                      guest.status === GuestStatus.NOT_CONFIRMED ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                      'bg-danger/10 text-danger border-danger/20'
                    ]"
                  >
                    {{ guest.status === GuestStatus.CONFIRMED ? 'Vem' : guest.status === GuestStatus.NOT_CONFIRMED ? 'Pendente' : 'Não vem' }}
                  </button>
                </td>
                <td class="px-8 py-6 text-center">
                  <button 
                    @click="toggleCheckIn(guest)"
                    class="group relative inline-flex items-center justify-center p-2"
                  >
                    <div :class="[
                      'w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center',
                      guest.attended 
                        ? 'bg-primary-600 border-primary-600 shadow-lg shadow-primary-600/30 text-white' 
                        : 'bg-transparent border-slate-300 dark:border-white/10 group-hover:border-primary-500'
                    ]">
                       <CheckCircle2 v-if="guest.attended" class="w-4 h-4" />
                    </div>
                  </button>
                </td>
                <td class="px-8 py-6 text-right">
                  <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      v-if="guest.status === GuestStatus.CONFIRMED"
                      @click="openQRCodeModal(guest)"
                      class="p-2.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all"
                      title="QR Code"
                    >
                      <QrCode class="w-4 h-4" />
                    </button>
                    <button 
                      v-if="guest.companionCount > 0"
                      @click="handleViewCompanions(guest)"
                      class="p-2.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-xl transition-all"
                      title="Companions"
                    >
                      <Users class="w-4 h-4" />
                    </button>
                    <button 
                      @click="handleEditGuest(guest)"
                      class="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-600/10 rounded-xl transition-all"
                      title="Editar"
                    >
                      <Edit class="w-4 h-4" />
                    </button>
                    <button 
                      @click="handleDeleteGuest(guest)"
                      class="p-2.5 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-xl transition-all"
                      title="Apagar"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <GuestFormModal
      v-if="showGuestModal"
      :event-id="eventId"
      :guest="selectedGuest"
      @success="onGuestSuccess"
      @close="showGuestModal = false; selectedGuest = null"
    />

    <CompanionsListModal
      v-if="showCompanionsModal && selectedGuestForCompanions"
      :event-id="eventId"
      :guest="selectedGuestForCompanions"
      @refresh="fetchData"
      @close="showCompanionsModal = false; selectedGuestForCompanions = null"
    />

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

    <!-- Mobile Camera FAB -->
    <button 
      v-if="isMobile && canPerformCheckIn"
      @click="showScanner = true"
      class="fixed bottom-10 right-10 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary-600/40 active:scale-95 hover:scale-105 transition-all z-40 animate-bounce"
    >
      <Camera class="w-8 h-8" />
    </button>

    <!-- Scanner Overlay -->
    <QrScanner 
      v-if="showScanner"
      :on-scan="onQrScan"
      :on-close="() => showScanner = false"
    />
  </div>
</template>

<style scoped>
/* Transições de lista se desejar adicionar futuramente */
</style>
