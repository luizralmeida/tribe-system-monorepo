<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Calendar, 
  ChevronRight, 
  MapPin, 
  Plus, 
  CalendarCheck, 
  CalendarClock,
  LayoutGrid,
  Pencil,
  Trash2
} from 'lucide-vue-next';
import { eventService } from '../services/event.service';
import EventFormModal from '../components/EventFormModal.vue';
import type { Event, EventStats } from '../types';

const router = useRouter();
const events = ref<Event[]>([]);
const stats = ref<EventStats | null>(null);
const isLoading = ref(true);
const isModalOpen = ref(false);
const selectedEvent = ref<Event | null>(null);

const fetchEvents = async () => {
  try {
    const response = await eventService.findAll();
    events.value = response.data;
  } catch (error) {
    console.error('Failed to fetch events', error);
  }
};

const fetchStats = async () => {
  try {
    const response = await eventService.getStats();
    stats.value = response;
  } catch (error) {
    console.error('Failed to fetch stats', error);
  }
};

const goToDashboard = (id: number) => {
  router.push(`/events/${id}`);
};

const handleEdit = (event: Event) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

const handleDelete = async (event: Event) => {
  if (!confirm(`Tem certeza que deseja excluir o evento "${event.name}"?`)) return;
  
  try {
    await eventService.delete(event.id);
    fetchEvents();
    fetchStats();
  } catch (error) {
    console.error('Failed to delete event', error);
    alert('Erro ao excluir evento.');
  }
};

const handleModalClose = () => {
  isModalOpen.value = false;
  selectedEvent.value = null;
};

const handleCreateSuccess = () => {
  handleModalClose();
  fetchEvents();
  fetchStats();
};

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([fetchEvents(), fetchStats()]);
  isLoading.value = false;
});
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white">Eventos</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Acompanhe e gerencie todos os eventos da sua tribo.</p>
      </div>
      <button
        @click="handleEdit(null as any)"
        class="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary-500/20"
      >
        <Plus class="w-5 h-5" />
        <span>Novo Evento</span>
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400">
            <LayoutGrid class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total de Eventos</p>
            <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ stats?.total || 0 }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl text-green-600 dark:text-green-400">
            <CalendarCheck class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Concluídos</p>
            <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ stats?.completed || 0 }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-amber-600 dark:text-amber-400">
            <CalendarClock class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Agendados</p>
            <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ stats?.future || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Events List -->
    <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
      <div v-else-if="events.length === 0" class="text-center py-20 px-6">
        <div class="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar class="w-10 h-10 text-slate-400" />
        </div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Nenhum evento ainda</h3>
        <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Comece criando seu primeiro evento para gerenciar seus convidados.</p>
      </div>
      <div v-else class="divide-y divide-slate-100 dark:divide-slate-800">
        <div
          v-for="event in events"
          :key="event.id"
          class="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
        >
          <div @click="goToDashboard(event.id)" class="flex-1 flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xl">
              {{ event.name?.charAt(0).toUpperCase() || 'E' }}
            </div>
            <div>
              <h4 class="font-bold text-slate-800 dark:text-white group-hover:text-primary-600 transition-colors">{{ event.name }}</h4>
              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 text-sm text-slate-500 dark:text-slate-400">
                <span class="flex items-center gap-1">
                  <Calendar class="w-4 h-4" />
                  {{ new Date(event.date).toLocaleDateString() }}
                </span>
                <span class="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                <span v-if="event.address" class="flex items-center gap-1">
                  <MapPin class="w-4 h-4" />
                  {{ event.address.street }}, {{ event.address.number }} - {{ event.address.neighborhood }} ({{ event.address.city }})
                </span>
                <span v-else class="flex items-center gap-1">
                  <MapPin class="w-4 h-4" />
                  ID: {{ event.addressId }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 transition-opacity">
            <button 
              @click.stop="handleEdit(event)" 
              class="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all"
              title="Editar Evento"
            >
              <Pencil class="w-5 h-5" />
            </button>
            <button 
              @click.stop="handleDelete(event)" 
              class="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
              title="Excluir Evento"
            >
              <Trash2 class="w-5 h-5" />
            </button>
            <div class="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <button @click="goToDashboard(event.id)" class="p-2 text-slate-400 hover:text-primary-600 transition-colors">
              <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Form Modal -->
    <EventFormModal
      v-if="isModalOpen"
      :event="selectedEvent"
      @close="handleModalClose"
      @success="handleCreateSuccess"
    />
  </div>
</template>
