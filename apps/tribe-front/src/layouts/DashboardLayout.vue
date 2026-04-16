<script setup lang="ts">
import { useAuthStore } from '../store/auth';
import { LogOut, Menu, X } from 'lucide-vue-next';
import { ref } from 'vue';

const authStore = useAuthStore();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

import { navigationConfig } from '../config/navigation';
import { computed } from 'vue';

const navItems = computed(() => {
  const currentRole = authStore.user?.role || 'COMMON';
  return navigationConfig.filter(
    (item) => !item.roles || item.roles.includes(currentRole)
  );
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
    <!-- Sidebar / Mobile Drawer -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="h-full flex flex-col">
        <div class="p-6 flex items-center justify-between">
          <h1 class="text-2xl font-bold text-primary-600 dark:text-primary-400">Tribe</h1>
          <button @click="toggleSidebar" class="lg:hidden p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <X class="w-6 h-6" />
          </button>
        </div>

        <nav class="flex-1 px-4 space-y-1">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="{ name: item.route }"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400"
            active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.name }}</span>
          </router-link>
        </nav>

        <div class="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            @click="authStore.logout()"
            class="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <LogOut class="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
    ></div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0">
      <header class="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 lg:hidden">
        <button @click="toggleSidebar" class="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
          <Menu class="w-6 h-6" />
        </button>
        <h1 class="text-xl font-bold text-primary-600 dark:text-primary-400">Tribe</h1>
        <div class="w-10"></div> <!-- Spacer -->
      </header>

      <div class="p-6 md:p-8 overflow-y-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>
