<script setup lang="ts">
import { useAuthStore } from '../store/auth';
import { LogOut, Menu, X } from 'lucide-vue-next';
import { ref } from 'vue';
import ThemeToggle from '../components/ThemeToggle.vue';
import { navigationConfig } from '../config/navigation';
import { computed } from 'vue';
import horizontalFullLogo from '@/assets/horizontal-full-logo.svg';

const authStore = useAuthStore();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const navItems = computed(() => {
  const currentRole = authStore.user?.role || 'VIEW';
  return navigationConfig.filter(
    (item) => !item.roles || item.roles.includes(currentRole as any)
  );
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#020617] flex transition-colors duration-500 font-sans">
    <!-- Sidebar / Mobile Drawer -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-72 glass border-r border-slate-200/50 dark:border-white/5 transform transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="h-full flex flex-col">
        <div class="p-8 flex items-center justify-between">
          <img :src="horizontalFullLogo" alt="Presença VIP" class="h-9 w-auto" />
          <button @click="toggleSidebar" class="lg:hidden p-2 text-slate-500 hover:text-primary-600 transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <nav class="flex-1 px-4 space-y-2 mt-4">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="{ name: item.route }"
            class="flex items-center space-x-3 px-5 py-3.5 rounded-2xl transition-all text-slate-500 dark:text-slate-400 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 group"
            active-class="bg-primary-600 !text-white shadow-lg shadow-primary-600/20 font-bold"
          >
            <component :is="item.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
            <span class="tracking-tight">{{ item.name }}</span>
          </router-link>
        </nav>

        <div class="p-6 border-t border-slate-200/50 dark:border-white/5">
          <div class="mb-6 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center gap-3">
             <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-black text-sm">
                {{ authStore.user?.name?.charAt(0) }}
             </div>
             <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-slate-900 dark:text-white truncate">{{ authStore.user?.name }}</p>
                <p class="text-xs text-slate-500 truncate lowercase">{{ authStore.user?.role }}</p>
             </div>
          </div>
          <button
            @click="authStore.logout()"
            class="flex items-center space-x-3 w-full px-5 py-3.5 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-danger/10 hover:text-danger transition-all font-bold group"
          >
            <LogOut class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-md transition-opacity duration-500"
    ></div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header class="h-20 flex items-center justify-between px-8 glass border-b border-slate-200/50 dark:border-white/5 sticky top-0 z-30">
        <button @click="toggleSidebar" class="p-2 text-slate-500 hover:text-primary-600 lg:hidden">
          <Menu class="w-6 h-6" />
        </button>
        
        <div class="flex items-center gap-2 lg:hidden">
            <img :src="horizontalFullLogo" alt="Presença VIP" class="h-7 w-auto" />
        </div>

        <div class="hidden lg:block text-slate-400 text-sm font-medium italic">
           Bem-vindo ao centro de controle VIP.
        </div>
        
        <div class="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      <div class="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform translate-y-4 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 dark:bg-slate-800 rounded-full;
}
</style>
