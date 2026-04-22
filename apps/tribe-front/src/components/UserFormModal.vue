<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { userService } from '../services/user.service';
import { eventService } from '../services/event.service';
import { 
  X, Loader2, Save, User as UserIcon, Mail, Phone, 
  Shield, Lock, Search, Trash2, Calendar, MapPin, 
  ChevronLeft, ChevronRight, Plus
} from 'lucide-vue-next';
import type { User, Event } from '../types';
import { UserRole } from '../types';

interface Props {
  user?: User | null;
}

const props = defineProps<Props>();

const emit = defineEmits(['close', 'success']);

const formData = ref({
  name: '',
  email: '',
  phone: '',
  role: 'VIEW' as UserRole,
  password: '',
  active: true,
  eventIds: [] as number[]
});

const isLoading = ref(false);
const isSearching = ref(false);
const error = ref('');
const searchQuery = ref('');
const searchResults = ref<Event[]>([]);
const selectedEvents = ref<Event[]>([]);
const pagination = ref({
  page: 1,
  total: 0,
  limit: 5
});

let debounceTimeout: any = null;

onMounted(async () => {
  if (props.user) {
    formData.value = {
      name: props.user.name,
      email: props.user.email,
      phone: props.user.phone,
      role: props.user.role,
      active: props.user.active,
      password: '',
      eventIds: props.user.eventIds || []
    };

    if (formData.value.eventIds.length > 0) {
      // Fetch selected events to show their names
      await Promise.all(
        formData.value.eventIds.map(async (id) => {
          try {
            const event = await eventService.findById(id);
            selectedEvents.value.push(event);
          } catch (e) {
            console.error(`Error fetching event ${id}`, e);
          }
        })
      );
    }
  }
  await fetchEvents();
});

const fetchEvents = async (page = 1) => {
  isSearching.value = true;
  try {
    const response = await eventService.findAll({
      page,
      limit: pagination.value.limit,
      name: searchQuery.value
    });
    searchResults.value = response.data;
    pagination.value = {
      page,
      total: response.total,
      limit: pagination.value.limit
    };
  } catch (err) {
    console.error('Error fetching events:', err);
  } finally {
    isSearching.value = false;
  }
};

const handleSearch = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchEvents(1);
  }, 500);
};

const toggleEvent = (event: Event) => {
  const index = formData.value.eventIds.indexOf(event.id);
  if (index === -1) {
    formData.value.eventIds.push(event.id);
    selectedEvents.value.push(event);
  } else {
    formData.value.eventIds.splice(index, 1);
    selectedEvents.value = selectedEvents.value.filter(e => e.id !== event.id);
  }
};

const isEventSelected = (eventId: number) => {
  return formData.value.eventIds.includes(eventId);
};

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    if (props.user) {
      // For updates, password is optional
      const updateData: any = { ...formData.value };
      if (!updateData.password) delete updateData.password;
      await userService.update(props.user.id, updateData);
    } else {
      if (!formData.value.password) {
        error.value = 'Senha é obrigatória para novos usuários.';
        isLoading.value = false;
        return;
      }
      await userService.create(formData.value);
    }
    emit('success');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao salvar usuário.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
    <div @click="emit('close')" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    
    <div class="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all">
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">
            {{ user ? 'Editar Usuário' : 'Novo Usuário' }}
          </h3>
          <button @click="emit('close')" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nome Completo</label>
              <div class="relative">
                <UserIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.name" type="text" required placeholder="João Silva" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.email" type="email" required placeholder="joao@email.com" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Telefone</label>
              <div class="relative">
                <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.phone" type="text" required placeholder="(11) 99999-9999" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Permissão (Role)</label>
              <div class="relative">
                <Shield class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select v-model="formData.role" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white appearance-none">
                  <option value="VIEW">Vizualização (VIEW)</option>
                  <option value="EDIT">Edição (EDIT)</option>
                  <option value="CHECKER">Check-in (CHECKER)</option>
                  <option value="SUPER">Administrador (SUPER)</option>
                </select>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Senha</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.password" type="password" :required="!user" placeholder="••••••••" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
              <p v-if="user" class="text-[10px] text-slate-400 ml-1">Deixe em branco para manter a senha atual.</p>
            </div>

            <div class="flex items-center space-x-3 sm:pt-6 ml-2">
              <input v-model="formData.active" type="checkbox" id="active" class="w-5 h-5 rounded-lg border-slate-200 text-primary-600 focus:ring-primary-500" />
              <label for="active" class="text-sm font-bold text-slate-700 dark:text-slate-300">Usuário Ativo</label>
            </div>
          </div>

          <!-- Event Association Section -->
          <div class="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Calendar class="w-5 h-5 text-primary-500" />
                Vincular a Eventos
              </h4>
              <span class="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full">
                {{ formData.eventIds.length }} selecionados
              </span>
            </div>

            <!-- Selected Events Chips -->
            <div v-if="selectedEvents.length > 0" class="flex flex-wrap gap-2 mb-4">
              <div v-for="event in selectedEvents" :key="event.id" class="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <span class="truncate max-w-[150px]">{{ event.name }}</span>
                <button @click="toggleEvent(event)" type="button" class="text-slate-400 hover:text-red-500 transition-colors">
                  <X class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <!-- Event Search -->
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                v-model="searchQuery" 
                @input="handleSearch"
                type="text" 
                placeholder="Buscar evento por nome..." 
                class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-white" 
              />
              <Loader2 v-if="isSearching" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500 animate-spin" />
            </div>

            <!-- Search Results -->
            <div v-if="searchResults.length > 0" class="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              <div 
                v-for="event in searchResults" 
                :key="event.id"
                class="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800/50 transition-all font-medium"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                    <Calendar class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-800 dark:text-white leading-none">{{ event.name }}</p>
                    <p class="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin class="w-2.5 h-2.5" />
                      {{ event.address?.city }}, {{ event.address?.state }}
                    </p>
                  </div>
                </div>
                <button 
                  @click="toggleEvent(event)" 
                  type="button"
                  :class="[
                    'p-2 rounded-lg transition-all',
                    isEventSelected(event.id) 
                      ? 'bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20' 
                      : 'bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900/20'
                  ]"
                >
                  <Trash2 v-if="isEventSelected(event.id)" class="w-4 h-4" />
                  <Plus v-else class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Search Pagination -->
            <div v-if="pagination.total > pagination.limit" class="flex items-center justify-center gap-4 pt-2">
              <button 
                @click="fetchEvents(pagination.page - 1)" 
                :disabled="pagination.page === 1"
                type="button"
                class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              <span class="text-xs font-bold text-slate-500">
                Página {{ pagination.page }} de {{ Math.ceil(pagination.total / pagination.limit) }}
              </span>
              <button 
                @click="fetchEvents(pagination.page + 1)" 
                :disabled="pagination.page >= Math.ceil(pagination.total / pagination.limit)"
                type="button"
                class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>

            <div v-else-if="!isSearching && searchQuery && searchResults.length === 0" class="py-4 text-center">
              <p class="text-xs text-slate-400">Nenhum evento encontrado para "{{ searchQuery }}".</p>
            </div>
          </div>

          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-red-500 text-sm font-medium">
            {{ error }}
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              @click="emit('close')"
              class="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="flex-[2] bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-2xl font-extrabold transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center space-x-2"
            >
              <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
              <Save v-else class="w-5 h-5" />
              <span>{{ user ? 'Salvar Alterações' : 'Criar Usuário' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
