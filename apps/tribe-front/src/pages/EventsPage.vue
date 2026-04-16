<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Event, EventStats } from '../types';

const events = ref<Event[]>([]);
const stats = ref<EventStats | null>(null);
const isLoading = ref(true);

onMounted(() => {
  // fetch logic will go here
  isLoading.value = false;
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100">Eventos</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Totalizers will go here -->
    </div>
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
      <div v-else-if="events.length === 0" class="text-center py-12">
        <p class="text-slate-500 dark:text-slate-400">Nenhum evento encontrado.</p>
      </div>
      <div v-else>
        <!-- List will go here -->
      </div>
    </div>
  </div>
</template>
