<script setup lang="ts">
import { AlertTriangle, Info, AlertCircle } from 'lucide-vue-next';

interface Props {
  title: string;
  message: string;
  type?: 'danger' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'warning',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar'
});

defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-slate-950/40 backdrop-blur-md" @click="$emit('cancel')"></div>
    
    <div class="w-full max-w-md relative animate-in fade-in zoom-in duration-300">
      <div class="glass-card overflow-hidden border border-white/10 dark:border-white/5 shadow-2xl">
        <div class="p-8">
          <div class="flex items-center gap-5 mb-6">
            <div :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center transition-transform hover:scale-110',
              type === 'danger' ? 'bg-danger/10 text-danger' :
              type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
              'bg-primary-500/10 text-primary-500'
            ]">
              <AlertTriangle v-if="type === 'warning'" class="w-7 h-7" />
              <AlertCircle v-else-if="type === 'danger'" class="w-7 h-7" />
              <Info v-else class="w-7 h-7" />
            </div>
            <div>
              <h3 class="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">{{ title }}</h3>
              <p class="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">Confirmação Requerida</p>
            </div>
          </div>

          <p class="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
            {{ message }}
          </p>

          <div class="flex gap-4">
            <button 
              @click="$emit('cancel')"
              class="flex-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-black tracking-tight hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              {{ cancelText }}
            </button>
            <button 
              @click="$emit('confirm')"
              :class="[
                'flex-1 px-6 py-4 rounded-2xl font-black tracking-tight text-white transition-all shadow-lg active:scale-95',
                type === 'danger' ? 'bg-danger hover:bg-red-600 shadow-danger/20' :
                type === 'warning' ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' :
                'bg-primary-600 hover:bg-primary-700 shadow-primary-600/20'
              ]"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
