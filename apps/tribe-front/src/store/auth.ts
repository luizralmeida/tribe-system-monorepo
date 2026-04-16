import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isSuper: (state) => state.user?.role === 'SUPER',
  },
  actions: {
    async login(credentials: any) {
      try {
        const { data } = await api.post('/auth/login', credentials);
        this.token = data.accessToken;
        this.user = data.user;
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
      if (!this.token) return;
      try {
        const { data } = await api.get('/auth/profile');
        this.user = data;
      } catch (error) {
        this.logout();
      }
    },
  },
});
