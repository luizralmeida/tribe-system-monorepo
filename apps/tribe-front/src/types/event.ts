import type { Address } from './address';

export interface Event {
  id: number;
  name: string | null;
  addressId: number;
  date: string;
  address?: Address;
  createdAt: string;
  updatedAt: string | null;
}

export interface EventStats {
  total: number;
  completed: number;
  future: number;
}

export interface EventDashboardStats {
  total: number;
  confirmed: number;
  notConfirmed: number;
  attended: number;
  nonPayingChildrenCount: number;
}
