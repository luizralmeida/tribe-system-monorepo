<script setup lang="ts">
import { useAuthStore } from '../store/auth';
import { Users, Calendar, CheckCircle, ClipboardList } from 'lucide-vue-next';

const authStore = useAuthStore();

const stats = [
  { name: 'Total Convidados', value: '0', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  { name: 'Confirmados', value: '0', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  { name: 'Presentes', value: '0', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
  { name: 'Pendentes', value: '0', icon: ClipboardList, color: 'text-orange-600', bg: 'bg-orange-100' },
];
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white">Olá, {{ authStore.user?.name || 'Carregando...' }}!</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Bem-vindo ao painel de gestão da sua Tribo.</p>
      </div>
      <div v-if="authStore.isSuper" class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-semibold border border-primary-100 dark:border-primary-800">
        Super Administrador
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.name" class="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center space-x-4">
          <div :class="[stat.bg, 'p-3 rounded-2xl transform transition-transform group-hover:scale-110']">
            <component :is="stat.icon" :class="['w-6 h-6', stat.color]" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ stat.name }}</p>
            <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-6">Próximos Passos</h3>
        <div class="space-y-4">
          <div class="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div class="flex-shrink-0 mt-1">
              <div class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xs italic">1</div>
            </div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-white">Gerencie seus Eventos</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Clique em Eventos no menu lateral para começar a organizar sua primeira festa.</p>
            </div>
          </div>
          <div class="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div class="flex-shrink-0 mt-1">
              <div class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xs italic">2</div>
            </div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-white">Importe Convidados</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Você pode subir uma planilha com todos os nomes de uma vez só dentro de um evento.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-primary-600 to-indigo-700 p-8 rounded-3xl text-white flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-bold mb-2">Precisa de Ajuda?</h3>
          <p class="text-primary-100 text-sm">Consulte a documentação ou entre em contato com o suporte para dúvidas avançadas.</p>
        </div>
        <button class="mt-8 bg-white text-primary-600 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors">
          Ver Documentação
        </button>
      </div>
    </div>
  </div>
</template>
