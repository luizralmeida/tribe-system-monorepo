import api from './api';
import type { User, UserStats, PaginatedResponse, PaginationParams } from '../types';

export const userService = {
  async findAll(params: PaginationParams = {}): Promise<PaginatedResponse<User>> {
    const { data } = await api.get('users', { params });
    return data;
  },
  async findById(id: number): Promise<User> {
    const { data } = await api.get(`users/${id}`);
    return data;
  },
  async create(userData: Partial<User>): Promise<User> {
    const { data } = await api.post('users', userData);
    return data;
  },
  async update(id: number, userData: Partial<User>): Promise<User> {
    const { data } = await api.put(`users/${id}`, userData);
    return data;
  },
  async delete(id: number): Promise<void> {
    await api.delete(`users/${id}`);
  },
  async getStats(): Promise<UserStats> {
    const { data } = await api.get('users/stats');
    return data;
  },
};
