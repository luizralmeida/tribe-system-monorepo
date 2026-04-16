export interface Event {
  id: number;
  name: string | null;
  addressId: number;
  date: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface EventStats {
  total: number;
  completed: number;
  future: number;
}
