import api from './api';
import type { Guest, PaginatedResponse, PaginationParams } from '../types';

export interface GuestEvent extends Guest {
  event: {
    id: number;
    name: string;
    date: string;
    address?: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
    };
  };
}

export const guestService = {
  // Existing methods
  async findByEvent(eventId: number, params: PaginationParams = {}): Promise<PaginatedResponse<Guest>> {
    const { data } = await api.get(`events/${eventId}/guests`, { params });
    return data;
  },

  async create(eventId: number, guestData: Partial<Guest>): Promise<Guest> {
    const { data } = await api.post(`events/${eventId}/guests`, guestData);
    return data;
  },

  async update(eventId: number, id: number, guestData: Partial<Guest>): Promise<Guest> {
    const { data } = await api.put(`events/${eventId}/guests/${id}`, guestData);
    return data;
  },

  async delete(eventId: number, id: number): Promise<void> {
    await api.delete(`events/${eventId}/guests/${id}`);
  },

  async getCompanions(eventId: number, id: number): Promise<Guest[]> {
    const { data } = await api.get(`events/${eventId}/guests/${id}/companions`);
    return data;
  },

  async getDashboard(eventId: number): Promise<any> {
    const { data } = await api.get(`events/${eventId}/guests/dashboard`);
    return data;
  },

  // New RSVP methods
  async findByPhone(phone: string): Promise<GuestEvent[]> {
    const { data } = await api.get(`guests/by-phone/${phone}`);
    return data;
  },

  async updateStatus(id: number, status: string): Promise<{ guest: Guest; qrCode?: string }> {
    const { data } = await api.put(`guests/${id}/status`, { status });
    return data;
  },

  async checkIn(id: number): Promise<Guest> {
    const { data } = await api.put(`guests/${id}/check-in`);
    return data;
  },
  
  async getGuestById(id: number): Promise<GuestEvent> {
    const { data } = await api.get(`guests/${id}`);
    return data;
  }
};
