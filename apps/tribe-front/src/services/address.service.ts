import api from './api';
import type { Address } from '../types';

export const addressService = {
  async create(addressData: Partial<Address>): Promise<Address> {
    const { data } = await api.post('/addresses', addressData);
    return data;
  },

  async update(id: number, addressData: Partial<Address>): Promise<Address> {
    const { data } = await api.put(`/addresses/${id}`, addressData);
    return data;
  },

  async findById(id: number): Promise<Address> {
    const { data } = await api.get(`/addresses/${id}`);
    return data;
  },
};
