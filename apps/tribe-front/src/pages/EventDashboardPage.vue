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
  Mail,
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
  // Expected format: some URL or just the ID
  // For now let's assume it's the ID or a link like /admin/check-in/:id
  const match = data.match(/\/check-in\/(\d+)/);
  const id = match ? match[1] : data;
  
  if (id) {
    showScanner.value = false;
    router.push({ name: 'staffCheckIn', params: { id } });
  }
};
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <router-link 
          to="/events" 
          class="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-primary-600 transition-colors shadow-sm"
        >
          <ChevronLeft class="w-6 h-6" />
        </router-link>
        <div>
          <h2 class="text-3xl font-bold text-slate-800 dark:text-white">
            {{ event ? event.name : `Dashboard do Evento ${eventId}` }}
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Gerencie a lista de convidados e acompanhe as confirmações.</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
          <Users class="w-5 h-5" />
          <p class="font-medium">Total</p>
        </div>
        <p class="text-3xl font-bold text-slate-800 dark:text-white">{{ stats?.total || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-3 text-green-600 dark:text-green-400 mb-2">
          <CheckCircle2 class="w-5 h-5" />
          <p class="font-medium">Confirmados</p>
        </div>
        <p class="text-3xl font-bold text-slate-800 dark:text-white">{{ stats?.confirmed || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-3 text-amber-600 dark:text-amber-400 mb-2">
          <XCircle class="w-5 h-5" />
          <p class="font-medium">Pendente</p>
        </div>
        <p class="text-3xl font-bold text-slate-800 dark:text-white">{{ stats?.notConfirmed || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-3 text-primary-600 dark:text-primary-400 mb-2">
          <UserCheck class="w-5 h-5" />
          <p class="font-medium">Presentes</p>
        </div>
        <p class="text-3xl font-bold text-slate-800 dark:text-white">{{ stats?.attended || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-3 text-pink-600 dark:text-pink-400 mb-2">
          <Baby class="w-5 h-5" />
          <p class="font-medium">Crianças não pagantes</p>
        </div>
        <p class="text-3xl font-bold text-slate-800 dark:text-white">{{ stats?.nonPayingChildrenCount || 0 }}</p>
      </div>
    </div>

    <!-- Guests List -->
    <div class="space-y-4">
      <div class="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div class="relative flex-1 w-full">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            v-model="searchQuery"
            @input="fetchData"
            type="text"
            placeholder="Buscar convidado..."
            class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-700 dark:text-slate-200"
          />
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="showGuestModal = true"
            class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2"
          >
            <Plus class="w-5 h-5" />
            Adicionar Convidado
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
        
        <div v-else-if="hasError" class="text-center py-12 px-6">
          <div class="bg-red-50 dark:bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle class="w-8 h-8 text-red-500" />
          </div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-1">Erro ao carregar dados</h3>
          <p class="text-slate-500 dark:text-slate-400">Não foi possível carregar as informações do evento. Verifique sua conexão ou tente novamente mais tarde.</p>
          <button @click="fetchData" class="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors">
            Tentar Novamente
          </button>
        </div>

        <div v-else-if="guests.length === 0" class="text-center py-12">
          <div class="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users class="w-8 h-8 text-slate-400" />
          </div>
          <p class="text-slate-500 dark:text-slate-400 font-medium">Nenhum convidado encontrado.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                <th class="px-6 py-4 font-semibold">Convidado</th>
                <th class="px-6 py-4 font-semibold text-center">Acompanhantes</th>
                <th class="px-6 py-4 font-semibold">Status</th>
                <th class="px-6 py-4 font-semibold text-center">Check-in</th>
                <th class="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr v-for="guest in guests" :key="guest.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4">
                  <div>
                    <p class="font-bold text-slate-800 dark:text-white">{{ guest.name }}</p>
                    <div class="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span v-if="guest.phone" class="flex items-center gap-1"><Phone class="w-3 h-3" /> 
                        <a :href="`https://wa.me/55${guest.phone}`" target="_blank">{{ guest.phone }}</a>
                      </span>
                      <span v-if="guest.email" class="flex items-center gap-1"><Mail class="w-3 h-3" /> {{ guest.email }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-bold text-slate-700 dark:text-slate-300">{{ guest.companionCount }}</span>
                </td>
                <td class="px-6 py-4">
                  <button 
                    @click="toggleStatus(guest)"
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-bold leading-none transition-all hover:scale-105 active:scale-95',
                      guest.status === GuestStatus.CONFIRMED ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      guest.status === GuestStatus.NOT_CONFIRMED ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    ]"
                  >
                    {{ guest.status === GuestStatus.CONFIRMED ? 'Confirmado' : guest.status === GuestStatus.NOT_CONFIRMED ? 'Pendente' : 'Não vai' }}
                  </button>
                </td>
                <td class="px-6 py-4 text-center">
                  <button 
                    @click="toggleCheckIn(guest)"
                    class="group relative inline-flex items-center justify-center transition-all p-1"
                  >
                    <span :class="[
                      'w-4 h-4 rounded-full border-2 transition-all',
                      guest.attended 
                        ? 'bg-green-500 border-green-500 shadow-sm shadow-green-500/50' 
                        : 'bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-primary-500'
                    ]"></span>
                  </button>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button 
                      v-if="guest.status === GuestStatus.CONFIRMED"
                      @click="openQRCodeModal(guest)"
                      class="p-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      title="Ver QR Code"
                    >
                      <QrCode class="w-4 h-4" />
                    </button>
                    <button 
                      v-if="guest.companionCount > 0"
                      @click="handleViewCompanions(guest)"
                      class="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      title="Ver Acompanhantes"
                    >
                      <Users class="w-4 h-4" />
                    </button>
                    <button 
                      @click="handleEditGuest(guest)"
                      class="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      title="Editar"
                    >
                      <Edit class="w-4 h-4" />
                    </button>
                    <button 
                      @click="handleDeleteGuest(guest)"
                      class="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Excluir"
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
      class="fixed bottom-8 right-8 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/40 active:scale-95 transition-all z-40"
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
