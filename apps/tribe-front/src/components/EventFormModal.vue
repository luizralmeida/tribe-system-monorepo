<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { eventService } from '../services/event.service';
import { addressService } from '../services/address.service';
import { X, Loader2, Save, Calendar, Type, Home, Map } from 'lucide-vue-next';
import type { Event } from '../types';
import { BrazilianState } from '../types';

interface Props {
  event?: Event | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'success']);

const formData = ref({
  name: '',
  date: new Date().toISOString().split('T')[0],
});

const addressFormData = ref({
  street: '',
  neighborhood: '',
  number: '',
  complement: '',
  city: '',
  state: 'SP' as BrazilianState,
  country: 'Brasil'
});

const isLoading = ref(false);
const error = ref('');

onMounted(async () => {
  if (props.event) {
    formData.value = {
      name: props.event.name || '',
      date: new Date(props.event.date).toISOString().split('T')[0],
    };
    
    // Fetch address details
    try {
      const address = await addressService.findById(props.event.addressId);
      addressFormData.value = {
        street: address.street,
        neighborhood: address.neighborhood,
        number: address.number,
        complement: address.complement || '',
        city: address.city,
        state: address.state,
        country: address.country
      };
    } catch (err) {
      console.error('Failed to fetch address details', err);
    }
  }
});

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    let addressId: number;
    
    if (props.event) {
      // Update address
      const updatedAddress = await addressService.update(props.event.addressId, addressFormData.value);
      addressId = updatedAddress.id;
      
      // Update event
      await eventService.update(props.event.id, {
        ...formData.value,
        addressId
      });
    } else {
      // Create address first
      const newAddress = await addressService.create(addressFormData.value);
      addressId = newAddress.id;
      
      // Create event with new addressId
      await eventService.create({
        ...formData.value,
        addressId
      });
    }
    emit('success');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao salvar evento.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
    <div @click="emit('close')" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    
    <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all my-8">
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">
            {{ event ? 'Editar Evento' : 'Novo Evento' }}
          </h3>
          <button @click="emit('close')" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Event Details Section -->
          <div class="space-y-4">
            <h4 class="text-sm font-bold text-primary-600 uppercase tracking-wider ml-1">Detalhes do Evento</h4>
            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nome do Evento</label>
              <div class="relative">
                <Type class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.name" type="text" placeholder="Ex: Casamento de Maria e João" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Data</label>
              <div class="relative w-1/2">
                <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="formData.date" type="date" required class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>
          </div>

          <!-- Location Section -->
          <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 class="text-sm font-bold text-primary-600 uppercase tracking-wider ml-1">Localização</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="sm:col-span-2 space-y-1">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Rua / Logradouro</label>
                <div class="relative">
                  <Home class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input v-model="addressFormData.street" type="text" required placeholder="Rua das Flores" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
                </div>
              </div>
              <div class="space-y-1">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Número</label>
                <input v-model="addressFormData.number" type="text" required placeholder="123" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Bairro</label>
                <input v-model="addressFormData.neighborhood" type="text" required placeholder="Centro" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
              <div class="space-y-1">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Complemento</label>
                <input v-model="addressFormData.complement" type="text" placeholder="Apto 101" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="sm:col-span-2 space-y-1">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Cidade</label>
                <div class="relative">
                  <Map class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input v-model="addressFormData.city" type="text" required placeholder="São Paulo" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
                </div>
              </div>
              <div class="space-y-1">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Estado</label>
                <select v-model="addressFormData.state" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white appearance-none">
                  <option v-for="state in Object.keys(BrazilianState)" :key="state" :value="state">{{ state }}</option>
                </select>
              </div>
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
              <span>{{ event ? 'Salvar Alterações' : 'Criar Evento' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
