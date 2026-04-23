import { defineStore } from 'pinia';
import api from '../services/api';
import type { User } from '../types';
import { UserRole } from '../types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null,
    isInitialLoading: true,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isSuper: (state) => state.user?.role === UserRole.SUPER,
  },
  actions: {
    async login(credentials: any) {
      try {
        const { data } = await api.post('auth/login', credentials);
        this.token = data.accessToken;
        this.user = data.user;
        this.isInitialLoading = false;
        localStorage.setItem('token', data.accessToken);
        return true;
      } catch (error) {
        console.error('Login failed', error);
        return false;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      window.location.href = '/login';
    },
    async fetchProfile() {
      if (!this.token) {
        this.isInitialLoading = false;
        return;
      }
      try {
        const { data } = await api.get('auth/me');
        this.user = data;
      } catch (error) {
        this.logout();
      } finally {
        this.isInitialLoading = false;
      }
    },
  },
});
