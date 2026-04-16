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
  <router-view />
</template>
