<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Users, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ChevronRight,
  Edit
} from 'lucide-vue-next';
import { guestService } from '../services/guest.service';
import type { Guest } from '../types';

interface Props {
  eventId: number;
  guest?: Guest | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'success']);

const isEdit = computed(() => !!props.guest);

const form = ref({
  name: '',
  phone: '',
  email: '',
  isChild: false,
  companions: [] as Array<{ name: string; phone?: string; email?: string; age?: number; isChild: boolean }>
});

const isLoading = ref(false);
const error = ref('');
const step = ref(1); // 1: Primary Guest, 2: Companions

onMounted(async () => {
  if (props.guest) {
    form.value = {
      name: props.guest.name,
      phone: props.guest.phone || '',
      email: props.guest.email || '',
      isChild: props.guest.isChild || false,
      companions: []
    };
    
    try {
      const existing = await guestService.getCompanions(props.eventId, props.guest.id);
      form.value.companions = existing.map((c: any) => ({
        name: c.name,
        age: c.age,
        phone: c.phone,
        email: c.email,
        isChild: c.isChild || false
      }));
    } catch (err) {
      console.error('Failed to fetch companions', err);
    }
  }
});

const addCompanion = () => {
  form.value.companions.push({ name: '', phone: form.value.phone, email: form.value.email, isChild: true });
};

const removeCompanion = (index: number) => {
  form.value.companions.splice(index, 1);
};

const nextStep = () => {
  if (!form.value.name) {
    error.value = 'Nome do convidado é obrigatório.';
    return;
  }
  error.value = '';
  step.value = 2;
};

const handleSubmit = async () => {
  if (!form.value.name) return;

  isLoading.value = true;
  error.value = '';

  try {
    const payload: any = {
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      isChild: form.value.isChild,
    };

    if (isEdit.value && props.guest) {
      await guestService.update(props.eventId, props.guest.id, payload);
    } else {
      payload.companions = form.value.companions;
      await guestService.create(props.eventId, payload);
    }
    emit('success');
  } catch (err) {
    console.error('Failed to save guest', err);
    error.value = 'Ocorreu um erro ao salvar o convidado.';
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
                <Users v-if="!isEdit" class="w-6 h-6" />
                <Edit v-else class="w-6 h-6" />
             </div>
             <div>
                <h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{{ isEdit ? 'Editar Registro' : 'Novo Convite VIP' }}</h3>
                <p class="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">
                   {{ step === 1 ? 'Dados do Titular' : `Acompanhantes (${form.companions.length})` }}
                </p>
             </div>
          </div>
          <button @click="emit('close')" class="p-3 text-slate-400 hover:text-danger transition-colors bg-slate-100 dark:bg-white/5 rounded-xl">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Form Content -->
        <div class="p-8">
          <!-- Progress Bar -->
          <div v-if="!isEdit" class="flex gap-2 mb-10">
             <div :class="['h-1.5 flex-1 rounded-full transition-all duration-500', step >= 1 ? 'bg-primary-600' : 'bg-slate-200 dark:bg-white/10']"></div>
             <div :class="['h-1.5 flex-1 rounded-full transition-all duration-500', step >= 2 ? 'bg-primary-600' : 'bg-slate-200 dark:bg-white/10']"></div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Step 1: Primary Guest -->
            <div v-if="step === 1" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Nome Completo</label>
                  <div class="relative group">
                    <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input v-model="form.name" type="text" placeholder="Ex: Luiz Almeida" class="input-premium pl-12" required />
                  </div>
                </div>
                
                <!-- Phone -->
                <div>
                  <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">WhatsApp</label>
                  <div class="relative group">
                    <Phone class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input v-model="form.phone" type="tel" placeholder="(00) 00000-0000" class="input-premium pl-12" />
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">E-mail</label>
                  <div class="relative group">
                    <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input v-model="form.email" type="email" placeholder="contato@exemplo.com" class="input-premium pl-12" />
                  </div>
                </div>

                <!-- isChild (Primary) -->
                <div class="md:col-span-2">
                  <div 
                    @click="form.isChild = !form.isChild"
                    :class="[
                      'p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group',
                      form.isChild ? 'bg-primary-500/5 border-primary-500/20' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-200 dark:hover:border-white/10'
                    ]"
                  >
                    <div class="flex items-center gap-3">
                      <div :class="[
                        'w-5 h-5 rounded-lg border flex items-center justify-center transition-all',
                        form.isChild ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white dark:bg-white/10 border-slate-200 dark:border-white/10'
                      ]">
                        <CheckCircle2 v-if="form.isChild" class="w-3 h-3" />
                      </div>
                      <div class="flex flex-col">
                        <span :class="[
                          'text-xs font-bold transition-colors',
                          form.isChild ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400'
                        ]">Criança não pagante</span>
                        <span class="text-[10px] text-slate-400 font-medium">Marque se o titular for uma criança (não pagante)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Companions -->
            <div v-if="step === 2" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div class="flex items-center justify-between mb-4">
                 <p class="text-sm font-bold text-slate-500">Adicione os acompanhantes vinculados a este titular.</p>
                 <button type="button" @click="addCompanion" class="flex items-center gap-2 text-primary-600 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform">
                   <Plus class="w-4 h-4" /> Adicionar
                 </button>
              </div>

              <div class="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                <div v-for="(companion, index) in form.companions" :key="index" class="p-6 glass border border-white/10 rounded-3xl relative group">
                  <button @click="removeCompanion(index)" type="button" class="absolute -top-2 -right-2 p-2 bg-danger text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-danger/20">
                    <Trash2 class="w-4 h-4" />
                  </button>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                       <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Nome do Acompanhante</label>
                       <input v-model="companion.name" type="text" placeholder="Nome Completo" class="input-premium" />
                    </div>
                    <div>
                      <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Idade (opcional)</label>
                      <input v-model="companion.age" type="number" placeholder="0" class="input-premium" />
                    </div>

                    <!-- isChild (Companion) -->
                    <div class="md:col-span-2">
                      <div 
                        @click="companion.isChild = !companion.isChild"
                        :class="[
                          'p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group',
                          companion.isChild ? 'bg-primary-500/5 border-primary-500/20' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-200 dark:hover:border-white/10'
                        ]"
                      >
                        <div class="flex items-center gap-3">
                          <div :class="[
                            'w-5 h-5 rounded-lg border flex items-center justify-center transition-all',
                            companion.isChild ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white dark:bg-white/10 border-slate-200 dark:border-white/10'
                          ]">
                            <CheckCircle2 v-if="companion.isChild" class="w-3 h-3" />
                          </div>
                          <div class="flex flex-col">
                            <span :class="[
                              'text-xs font-bold transition-colors',
                              companion.isChild ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400'
                            ]">Criança não pagante</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="form.companions.length === 0" class="text-center py-10 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[2.5rem]">
                   <p class="text-slate-400 font-medium">Nenhum acompanhante adicionado.</p>
                </div>
              </div>
            </div>

            <div v-if="error" class="text-danger text-sm font-bold text-center bg-danger/10 p-4 rounded-2xl animate-shake">
              {{ error }}
            </div>

            <!-- Footer Actions -->
            <div class="flex gap-4 pt-4">
              <button 
                v-if="step === 2 && !isEdit" 
                @click="step = 1" 
                type="button"
                class="flex-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-black tracking-tight hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                 Voltar
              </button>
              
              <button 
                v-if="step === 1 && !isEdit" 
                @click="nextStep" 
                type="button"
                class="flex-1 btn-primary py-4 text-lg flex items-center justify-center gap-3"
              >
                 Próximo Passo
                 <ChevronRight class="w-5 h-5" />
              </button>

              <button 
                v-if="isEdit || step === 2"
                type="submit" 
                :disabled="isLoading"
                class="flex-1 btn-primary py-4 text-lg flex items-center justify-center gap-3"
              >
                <CheckCircle2 v-if="!isLoading" class="w-5 h-5" />
                <div v-else class="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                <span>{{ isLoading ? 'Salvando...' : (isEdit ? 'Salvar Alterações' : 'Finalizar Convite') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
  background: rgba(148, 163, 184, 0.2);
  border-radius: 9999px;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
