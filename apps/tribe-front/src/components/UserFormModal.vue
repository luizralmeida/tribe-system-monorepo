<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  CheckCircle2,
  UserPlus,
  Phone,
  Calendar
} from 'lucide-vue-next';
import { userService } from '../services/user.service';
import { eventService } from '../services/event.service';
import { UserRole, UserRoleLabels } from '../types/enums';
import type { User as UserType, Event } from '../types';

interface Props {
  user?: UserType | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'success']);

const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  role: UserRole.VIEW as UserRole,
  eventIds: [] as number[]
});

const allEvents = ref<Event[]>([]);

const isLoading = ref(false);
const error = ref('');

onMounted(async () => {
  try {
    const response = await eventService.findAll({ limit: 100 });
    allEvents.value = response.data;
  } catch (err) {
    console.error('Failed to fetch events', err);
  }

  if (props.user) {
    form.value = {
      name: props.user.name,
      email: props.user.email,
      phone: props.user.phone || '',
      password: '',
      role: props.user.role as UserRole,
      eventIds: props.user.eventIds || []
    };
  }
});

const toggleEvent = (eventId: number) => {
  const index = form.value.eventIds.indexOf(eventId);
  if (index === -1) {
    form.value.eventIds.push(eventId);
  } else {
    form.value.eventIds.splice(index, 1);
  }
};

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || (!props.user && !form.value.password)) {
    error.value = 'Nome, e-mail e senha são obrigatórios para novos usuários.';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const payload: any = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      role: form.value.role,
      eventIds: form.value.eventIds
    };
    
    if (form.value.password) {
      payload.password = form.value.password;
    }

    if (props.user) {
      await userService.update(props.user.id, payload);
    } else {
      await userService.create(payload);
    }
    emit('success');
  } catch (err: any) {
    console.error('Failed to save user', err);
    error.value = err.response?.data?.message || 'Erro ao salvar usuário.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
    <div class="fixed inset-0 bg-slate-950/40 backdrop-blur-md" @click="emit('close')"></div>
    
    <div class="w-full max-w-md relative animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500">
      <div class="glass-card overflow-hidden border border-white/10 dark:border-white/5 shadow-3xl bg-white/90 dark:bg-[#020617]/90 backdrop-blur-2xl rounded-[2.5rem]">
        
        <!-- Header -->
        <div class="p-8 pb-0 flex items-center justify-between">
          <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-primary-600/10 flex items-center justify-center text-primary-600">
                <UserPlus class="w-6 h-6" />
             </div>
             <div>
                <h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{{ user ? 'Editar Usuário' : 'Novo Usuário' }}</h3>
                <p class="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">Controle de Acesso</p>
             </div>
          </div>
          <button @click="emit('close')" class="p-2 text-slate-400 hover:text-danger transition-colors bg-slate-100 dark:bg-white/5 rounded-xl">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Form Content -->
        <div class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div class="space-y-5">
              <!-- Name -->
              <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Nome Completo</label>
                <div class="relative group">
                  <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                  <input v-model="form.name" type="text" placeholder="Nome do colaborador" class="input-premium pl-12" required />
                </div>
              </div>

              <!-- Email -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">E-mail</label>
                  <div class="relative group">
                    <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input v-model="form.email" type="email" placeholder="email@exemplo.com" class="input-premium pl-12" required />
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Telefone</label>
                  <div class="relative group">
                    <Phone class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input v-model="form.phone" type="tel" placeholder="(00) 00000-0000" class="input-premium pl-12" required />
                  </div>
                </div>
              </div>

              <!-- Password -->
              <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">
                  {{ user ? 'Nova Senha (deixe em branco para manter)' : 'Senha de Acesso' }}
                </label>
                <div class="relative group">
                  <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                  <input v-model="form.password" type="password" placeholder="••••••••" class="input-premium pl-12" :required="!user" />
                </div>
              </div>

              <!-- Role Selector -->
              <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Nível de Permissão</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                   <button 
                    type="button"
                    v-for="role in Object.values(UserRole)"
                    :key="role"
                    @click="form.role = role"
                    :class="[
                      'px-3 py-4 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all text-center',
                      form.role === role ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-400'
                    ]"
                   >
                     {{ UserRoleLabels[role] }}
                   </button>
                </div>
              </div>

              <!-- Events Selector -->
              <div v-if="allEvents.length > 0">
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1 flex items-center gap-2">
                  <Calendar class="w-3 h-3" />
                  Vincular a Eventos
                </label>
                <div class="max-h-40 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                   <div 
                    v-for="event in allEvents" 
                    :key="event.id"
                    @click="toggleEvent(event.id)"
                    :class="[
                      'p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group',
                      form.eventIds.includes(event.id) ? 'bg-primary-500/5 border-primary-500/20' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-200 dark:hover:border-white/10'
                    ]"
                   >
                     <div class="flex items-center gap-3">
                        <div :class="[
                          'w-5 h-5 rounded-lg border flex items-center justify-center transition-all',
                          form.eventIds.includes(event.id) ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white dark:bg-white/10 border-slate-200 dark:border-white/10'
                        ]">
                          <CheckCircle2 v-if="form.eventIds.includes(event.id)" class="w-3 h-3" />
                        </div>
                        <span :class="[
                          'text-xs font-bold transition-colors',
                          form.eventIds.includes(event.id) ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400'
                        ]">{{ event.name }}</span>
                     </div>
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
                <span>{{ isLoading ? 'Salvando...' : (user ? 'Salvar Alterações' : 'Criar Conta') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
