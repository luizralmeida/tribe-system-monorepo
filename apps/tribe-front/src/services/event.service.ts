import api from './api';
import type { 
  Event, 
  EventStats, 
  EventDashboardStats, 
  PaginatedResponse, 
  PaginationParams,
  Guest
} from '../types';

export const eventService = {
  async findAll(params: PaginationParams = {}): Promise<PaginatedResponse<Event>> {
    const { data } = await api.get('/events', { params });
    return data;
  },

  async findById(id: number): Promise<Event> {
    const { data } = await api.get(`/events/${id}`);
    return data;
  },

  async create(eventData: Partial<Event>): Promise<Event> {
    const { data } = await api.post('/events', eventData);
    return data;
  },

  async update(id: number, eventData: Partial<Event>): Promise<Event> {
    const { data } = await api.put(`/events/${id}`, eventData);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/events/${id}`);
  },

  async getStats(): Promise<EventStats> {
    const { data } = await api.get('/events/stats');
    return data;
  },

  async getDashboardStats(eventId: number): Promise<EventDashboardStats> {
    const { data } = await api.get(`/events/${eventId}/guests/dashboard`);
    return data;
  },

  async getGuests(eventId: number, params: PaginationParams = {}): Promise<PaginatedResponse<Guest>> {
    const { data } = await api.get(`/events/${eventId}/guests`, { params });
    return data;
  },
};
