<script setup lang="ts">
interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'danger' | 'warning' | 'info';
}

const props = withDefaults(defineProps<Props>(), {
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  type: 'warning'
});

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div @click="emit('cancel')" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    
    <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all scale-100">
      <div class="p-8">
        <div class="flex flex-col items-center text-center space-y-4">
          <div :class="[
            'w-16 h-16 rounded-full flex items-center justify-center',
            type === 'danger' ? 'bg-red-50 text-red-500' : 
            type === 'warning' ? 'bg-amber-50 text-amber-500' : 
            'bg-blue-50 text-blue-500'
          ]">
            <AlertCircle class="w-8 h-8" />
          </div>
          
          <div class="space-y-2">
            <h3 class="text-2xl font-black text-slate-900 dark:text-white">{{ title }}</h3>
            <p class="text-slate-500 dark:text-slate-400">{{ message }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-8">
          <button 
            @click="emit('cancel')"
            class="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {{ cancelLabel }}
          </button>
          <button 
            @click="emit('confirm')"
            :class="[
              'px-6 py-4 text-white font-bold rounded-2xl transition-all shadow-lg',
              type === 'danger' ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' : 
              type === 'warning' ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20' : 
              'bg-primary-600 hover:bg-primary-700 shadow-primary-500/20'
            ]"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
