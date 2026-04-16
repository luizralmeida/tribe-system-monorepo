<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Event, Guest } from '../types';

const route = useRoute();
const eventId = Number(route.params.id);
const event = ref<Event | null>(null);
const guests = ref<Guest[]>([]);
const isLoading = ref(true);

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
        {{ event ? event.name : `Dashboard do Evento ${eventId}` }}
      </h2>
    </div>

    <!-- Stats -->
    <div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <section class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Users class="w-5 h-5" />
            <p class="text-slate-500">Total</p>
          </section>
          <p class="text-3xl font-bold text-slate-800 dark:text-white">{{ stats?.total }}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <section class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Check class="w-5 h-5" />
            <p class="text-slate-500">Ativos</p>
          </section>
          <p class="text-3xl font-bold text-slate-800 dark:text-white">{{ stats?.active }}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <section class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Calendar1 class="w-5 h-5" />
            <p class="text-slate-500">Com eventos futuros</p>
          </section>
          <p class="text-3xl font-bold text-slate-800 dark:text-white">{{ stats?.withFutureEvents }}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <section class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <ShieldUser class="w-5 h-5" />
            <p class="text-slate-500">Admins</p>
          </section>
          <p class="text-3xl font-bold text-slate-800 dark:text-white">{{ stats?.admin }}</p>
        </div>
      </div>
    </div>


    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
      <div v-else-if="guests.length === 0" class="text-center py-12">
        <p class="text-slate-500 dark:text-slate-400">Nenhum convidado encontrado.</p>
      </div>
      <div v-else>
        <!-- Guest List going here -->
      </div>
    </div>
  </div>
</template>
