<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  X, 
  Calendar, 
  MapPin, 
  Tag, 
  CheckCircle2,
  CalendarPlus
} from 'lucide-vue-next';
import { eventService } from '../services/event.service';
import type { Event } from '../types';

interface Props {
  event?: Event | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'success']);

const form = ref({
  name: '',
  date: '',
  address: {
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: ''
  }
});

const isLoading = ref(false);
const error = ref('');

onMounted(() => {
  if (props.event) {
    form.value = {
      name: props.event.name || '',
      date: props.event.date.split('T')[0],
      address: {
        street: props.event.address?.street || '',
        number: props.event.address?.number || '',
        neighborhood: props.event.address?.neighborhood || '',
        city: props.event.address?.city || '',
        state: props.event.address?.state || ''
      }
    };
  }
});

const handleSubmit = async () => {
  if (!form.value.name || !form.value.date) {
    error.value = 'Nome e data são obrigatórios.';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const payload: any = {
      name: form.value.name,
      date: form.value.date,
      address: form.value.address
    };

    if (props.event) {
      await eventService.update(props.event.id, payload);
    } else {
      await eventService.create(payload);
    }
    emit('success');
  } catch (err) {
    console.error('Failed to save event', err);
    error.value = 'Erro ao salvar evento. Tente novamente.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
    <div class="fixed inset-0 bg-slate-950/40 backdrop-blur-md" @click="emit('close')"></div>
    
    <div class="w-full max-w-2xl relative animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500">
      <div class="glass-card overflow-hidden border border-white/10 dark:border-white/5 shadow-3xl bg-white/90 dark:bg-[#020617]/90 backdrop-blur-2xl rounded-[2.5rem]">
        
        <!-- Header -->
        <div class="p-8 pb-0 flex items-center justify-between">
          <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-primary-600/10 flex items-center justify-center text-primary-600">
                <CalendarPlus class="w-6 h-6" />
             </div>
             <div>
                <h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{{ event ? 'Editar Evento' : 'Criar Novo Evento' }}</h3>
                <p class="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">Configurações Gerais</p>
             </div>
          </div>
          <button @click="emit('close')" class="p-3 text-slate-400 hover:text-danger transition-colors bg-slate-100 dark:bg-white/5 rounded-xl">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Form Content -->
        <div class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-10">
            <div class="space-y-6">
              <!-- Name & Date -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Nome do Evento</label>
                  <div class="relative group">
                    <Tag class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input v-model="form.name" type="text" placeholder="Ex: Baile de Gala 2024" class="input-premium pl-12" required />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Data</label>
                  <div class="relative group">
                    <Calendar class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input v-model="form.date" type="date" class="input-premium pl-12" required />
                  </div>
                </div>
              </div>

              <!-- Address Section -->
              <div class="pt-4 space-y-6">
                <div class="flex items-center gap-2 mb-2">
                   <div class="h-px flex-1 bg-slate-100 dark:bg-white/5"></div>
                   <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Localização</span>
                   <div class="h-px flex-1 bg-slate-100 dark:bg-white/5"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div class="md:col-span-3">
                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Rua / Avenida</label>
                    <div class="relative group">
                      <MapPin class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                      <input v-model="form.address.street" type="text" placeholder="Endereço do evento" class="input-premium pl-12" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Nº</label>
                    <input v-model="form.address.number" type="text" placeholder="123" class="input-premium" />
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Bairro</label>
                    <input v-model="form.address.neighborhood" type="text" placeholder="Centro" class="input-premium" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Cidade</label>
                    <input v-model="form.address.city" type="text" placeholder="São Paulo" class="input-premium" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">UF</label>
                    <input v-model="form.address.state" type="text" placeholder="SP" maxlength="2" class="input-premium text-center" />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="error" class="text-danger text-sm font-bold text-center bg-danger/10 p-4 rounded-2xl animate-shake">
              {{ error }}
            </div>

            <!-- Footer Actions -->
            <div class="flex gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
              <button 
                @click="emit('close')" 
                type="button"
                class="flex-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-black tracking-tight hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                 Cancelar
              </button>

              <button 
                type="submit" 
                :disabled="isLoading"
                class="flex-2 btn-primary py-4 text-lg flex items-center justify-center gap-3"
              >
                <CheckCircle2 v-if="!isLoading" class="w-5 h-5" />
                <div v-else class="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                <span>{{ isLoading ? 'Salvando...' : (event ? 'Salvar Alterações' : 'Confirmar Criação') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
