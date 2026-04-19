<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Guest } from '../types';
import { guestService } from '../services/guest.service';
import { X, Loader2, Save, User as UserIcon, Mail, Phone, Users, Plus, Trash2 } from 'lucide-vue-next';

interface Props {
  eventId: number;
  guest?: Guest | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'success']);

const formData = ref({
  name: '',
  email: '',
  phone: '',
  age: undefined as number | undefined,
  isChild: false,
});

const companions = ref<{ id?: number; name: string; age?: number; isChild: boolean }[]>([]);
const deletedCompanionIds = ref<number[]>([]);

const isLoading = ref(false);
const error = ref('');

onMounted(async () => {
  if (props.guest) {
    formData.value = {
      name: props.guest.name,
      email: props.guest.email,
      phone: props.guest.phone,
      age: props.guest.age,
      isChild: props.guest.isChild,
    };

    try {
      const existing = await guestService.getCompanions(props.eventId, props.guest.id);
      companions.value = existing.map(c => ({
        id: c.id,
        name: c.name,
        age: c.age,
        isChild: c.isChild
      }));
    } catch (err) {
      console.error('Failed to load existing companions', err);
    }
  }
});

const addCompanion = () => {
  companions.value.push({ name: '', age: undefined, isChild: true });
};

const removeCompanion = (index: number) => {
  const companion = companions.value[index];
  if (companion.id) {
    deletedCompanionIds.value.push(companion.id);
  }
  companions.value.splice(index, 1);
};

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    if (props.guest) {
      // Update existing guest
      await guestService.update(props.eventId, props.guest.id, formData.value);
      
      // Handle companions (update existing or create new)
      if (companions.value.length > 0) {
        const companionPromises = companions.value.map(comp => {
          const data = {
            name: comp.name,
            age: comp.age,
            isChild: comp.isChild,
            email: formData.value.email,
            phone: formData.value.phone,
            responsibleId: props.guest!.id,
          };
          
          if (comp.id) {
            return guestService.update(props.eventId, comp.id, data);
          } else {
            return guestService.create(props.eventId, data);
          }
        });
        await Promise.all(companionPromises);
      }

      // Handle deletions
      if (deletedCompanionIds.value.length > 0) {
        await Promise.all(
          deletedCompanionIds.value.map(id => guestService.delete(props.eventId, id))
        );
        deletedCompanionIds.value = [];
      }
    } else {
      // Create new guest
      const mainGuest = await guestService.create(props.eventId, {
        ...formData.value,
      });

      // 2. Create companions
      if (companions.value.length > 0) {
        const companionPromises = companions.value.map((comp: { name: string; age?: number; isChild: boolean }) => 
          guestService.create(props.eventId, {
            name: comp.name,
            age: comp.age,
            isChild: comp.isChild,
            email: formData.value.email, // Inherited
            phone: formData.value.phone, // Inherited
            responsibleId: mainGuest.id,
          })
        );
        await Promise.all(companionPromises);
      }
    }

    emit('success');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao salvar convidado.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
    <div @click="emit('close')" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    
    <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all">
      <div class="p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">
              {{ guest ? 'Editar Convidado' : 'Novo Convidado' }}
            </h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {{ guest ? 'Atualize os dados do convidado.' : 'Insira os dados do convidado principal e seus acompanhantes.' }}
            </p>
          </div>
          <button @click="emit('close')" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Main Guest Section -->
          <div class="space-y-4">
            <h4 class="text-sm font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 flex items-center gap-2">
              <UserIcon class="w-4 h-4" /> Dados Principais
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1 sm:col-span-2">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nome Completo *</label>
                <div class="relative">
                  <UserIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input v-model="formData.name" type="text" required placeholder="Nome do convidado" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white transition-all" />
                </div>
              </div>

              <div class="space-y-1">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Telefone *</label>
                <div class="relative">
                  <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input v-model="formData.phone" type="text" required placeholder="(00) 00000-0000" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white transition-all" />
                </div>
              </div>



              <div class="space-y-1">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
                <div class="relative">
                  <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input v-model="formData.email" type="email" required placeholder="email@exemplo.com" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white transition-all" />
                </div>
              </div>

              <div class="space-y-1">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Idade</label>
                <input v-model="formData.age" type="number" placeholder="Opcional" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white transition-all" />
              </div>

              <div class="flex items-center space-x-3 pt-6 ml-2 sm:col-span-2">
                <input v-model="formData.isChild" type="checkbox" id="mainIsChild" class="w-5 h-5 rounded-lg border-slate-200 text-primary-600 focus:ring-primary-500" />
                <label for="mainIsChild" class="text-sm font-bold text-slate-700 dark:text-slate-300 select-none cursor-pointer">Este convidado é uma criança não pagante?</label>
              </div>
            </div>
          </div>

          <!-- Companions Section -->
          <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 flex items-center gap-2">
                <Users class="w-4 h-4" /> {{ guest ? 'Adicionar Acompanhantes' : 'Acompanhantes' }}
              </h4>
              <button 
                type="button" 
                @click="addCompanion"
                class="text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-all"
              >
                <Plus class="w-3.5 h-3.5" /> Adicionar
              </button>
            </div>

            <div v-if="companions.length === 0" class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl text-center">
              <p class="text-slate-400 text-sm italic">Nenhum acompanhante adicionado.</p>
            </div>

            <div v-else class="space-y-3">
              <div v-for="(comp, index) in companions" :key="index" class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                <div class="flex flex-wrap gap-4 items-end">
                  <div class="flex-1 min-w-[200px] space-y-1">
                    <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase ml-1">Nome do Acompanhante *</label>
                    <input v-model="comp.name" type="text" required placeholder="Nome completo" class="w-full px-4 py-2 bg-white dark:bg-slate-900 border-none rounded-xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white text-sm" />
                  </div>
                  <div class="w-24 space-y-1">
                    <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase ml-1">Idade</label>
                    <input v-model="comp.age" type="number" placeholder="Opcional" class="w-full px-4 py-2 bg-white dark:bg-slate-900 border-none rounded-xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white text-sm" />
                  </div>
                  <div class="flex items-center space-x-2 py-2">
                    <input v-model="comp.isChild" type="checkbox" :id="'compIsChild-' + index" class="w-4 h-4 rounded-md border-slate-200 text-primary-600 focus:ring-primary-500" />
                    <label :for="'compIsChild-' + index" class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase select-none cursor-pointer">Criança não pagante?</label>
                  </div>
                  <button 
                    type="button" 
                    @click="removeCompanion(index)"
                    class="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <p class="text-[10px] text-slate-400 italic mt-2 ml-1">
              * Email e Telefone serão herdados automaticamente do convidado principal.
            </p>
          </div>

          <!-- Footer -->
          <div class="pt-6 border-t border-slate-100 dark:border-slate-800">
            <div v-if="error" class="mb-4 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-red-500 text-sm font-medium flex items-center gap-2">
              <X class="w-4 h-4" /> {{ error }}
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                @click="emit('close')"
                class="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                :disabled="isLoading"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="isLoading"
                class="flex-[2] bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-2xl font-extrabold transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
                <Save v-else class="w-5 h-5" />
                <span>{{ isLoading ? 'Salvando...' : (guest ? 'Atualizar Convidado' : 'Salvar Convidado') }}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
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
