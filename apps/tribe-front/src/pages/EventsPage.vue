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
  <div class="space-y-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div class="space-y-2">
        <h2 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Gestão de Eventos</h2>
        <p class="text-slate-500 dark:text-slate-400 font-medium">Acompanhe e maximize a experiência da sua tribo.</p>
      </div>
      <button
        @click="handleEdit(null as any)"
        class="btn-primary flex items-center gap-2 group"
      >
        <Plus class="w-5 h-5 transition-transform group-hover:rotate-90" />
        <span>Criar Novo Evento</span>
      </button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      <div v-for="(stat, idx) in [
        { label: 'Total de Eventos', value: stats?.total || 0, icon: LayoutGrid, color: 'text-blue-600 bg-blue-500/10' },
        { label: 'Eventos Concluídos', value: stats?.completed || 0, icon: CalendarCheck, color: 'text-emerald-600 bg-emerald-500/10' },
        { label: 'Próximos Eventos', value: stats?.future || 0, icon: CalendarClock, color: 'text-amber-600 bg-amber-500/10' }
      ]" :key="idx" :class="[
        'glass-card p-6 md:p-8 group border border-white/10 dark:border-white/5 flex flex-row md:flex-col md:items-start items-center gap-5',
        idx === 2 ? 'col-span-2 md:col-span-1' : ''
      ]">
        <div :class="[stat.color, 'w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0']">
          <component :is="stat.icon" class="w-7 h-7" />
        </div>
        <div>
          <p class="text-xs font-black uppercase tracking-widest text-slate-400">{{ stat.label }}</p>
          <p class="text-3xl font-black text-slate-900 dark:text-white mt-1">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Events Grid -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-14 w-14 border-t-4 border-primary-600 border-r-transparent"></div>
    </div>
    
    <div v-else-if="events.length === 0" class="glass-card py-20 px-10 text-center space-y-6">
      <div class="bg-primary-500/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto animate-float">
        <Calendar class="w-12 h-12 text-primary-500" />
      </div>
      <div class="space-y-2">
        <h3 class="text-2xl font-black text-slate-900 dark:text-white">Nenhum evento registrado</h3>
        <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">Sua jornada começa aqui. Crie seu primeiro evento VIP e gerencie tudo em um só lugar.</p>
      </div>
      <button @click="handleEdit(null as any)" class="btn-primary mt-4">Começar Agora</button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="event in events"
        :key="event.id"
        @click="goToDashboard(event.id)"
        class="glass-card p-8 group cursor-pointer border border-white/10 dark:border-white/5 flex flex-col justify-between"
      >
        <div class="space-y-6">
          <div class="flex items-start justify-between">
            <div class="w-16 h-16 rounded-[1.5rem] bg-primary-600/10 flex items-center justify-center text-primary-600 font-black text-2xl group-hover:scale-110 transition-transform duration-500">
              {{ event.name?.charAt(0).toUpperCase() || 'E' }}
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
               <button 
                  @click.stop="handleEdit(event)" 
                  class="p-3 bg-white/50 dark:bg-white/5 hover:bg-primary-500 hover:text-white rounded-xl transition-all"
                  title="Editar"
               >
                  <Pencil class="w-4 h-4" />
               </button>
               <button 
                  @click.stop="handleDelete(event)" 
                  class="p-3 bg-white/50 dark:bg-white/5 hover:bg-danger hover:text-white rounded-xl transition-all"
                  title="Excluir"
               >
                  <Trash2 class="w-4 h-4" />
               </button>
            </div>
          </div>

          <div class="space-y-2">
            <h4 class="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1">{{ event.name }}</h4>
            <p class="text-sm font-bold text-primary-600/80 dark:text-primary-400 flex items-center gap-2">
               <Calendar class="w-4 h-4" />
               {{ new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) }}
            </p>
          </div>

          <p v-if="event.address" class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 font-medium leading-relaxed">
            <MapPin class="w-4 h-4 inline-block -mt-1 mr-1" />
            {{ event.address.street }}, {{ event.address.number }} - {{ event.address.neighborhood }}
          </p>
        </div>

        <div class="mt-8 flex items-center justify-between">
           <div class="flex -space-x-3">
              <div v-for="i in 3" :key="i" class="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400">
                 VIP
              </div>
           </div>
           <div class="flex items-center gap-2 text-slate-400 font-black text-sm group-hover:text-primary-600 transition-colors uppercase tracking-widest">
              Gerenciar
              <ChevronRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
