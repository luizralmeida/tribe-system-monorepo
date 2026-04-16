import { UserRole } from './enums';

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface UserStats {
  total: number;
  active: number;
  withFutureEvents: number;
  admin: number;
}
