<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next';
import { useTheme } from '../composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <button
    @click="toggleTheme"
    class="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 overflow-hidden group"
    aria-label="Toggle Theme"
  >
    <div class="relative w-6 h-6">
      <transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform translate-y-10 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-500 ease-in absolute inset-0"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-10 opacity-0"
      >
        <Moon v-if="!isDark" class="w-6 h-6" />
        <Sun v-else class="w-6 h-6" />
      </transition>
    </div>
  </button>
</template>
