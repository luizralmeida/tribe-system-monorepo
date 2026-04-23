<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';

const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await authStore.fetchProfile();
  }
});
</script>

<template>
  <div v-if="authStore.isInitialLoading && authStore.isAuthenticated" class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
  <router-view v-else />
</template>
