import api from './api';

export const userService = {
  async findAll(params: any = {}) {
    const { data } = await api.get('/users', { params });
    return data;
  },
  async findById(id: number) {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },
  async create(userData: any) {
    const { data } = await api.post('/users', userData);
    return data;
  },
  async update(id: number, userData: any) {
    const { data } = await api.put(`/users/${id}`, userData);
    return data;
  },
  async delete(id: number) {
    await api.delete(`/users/${id}`);
  },
};
