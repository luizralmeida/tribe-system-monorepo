import type { User } from '../entities/user.entity.js';
import { UserFilter } from '../../application/dtos/user/user-filter.dto.js';

export interface CreateUserData {
  name: string;
  password: string;
  phone: string;
  email: string;
  role: string;
  active: boolean;
}

export interface UpdateUserData {
  name?: string;
  password?: string;
  phone?: string;
  email?: string;
  role?: string;
  active?: boolean;
}

export interface UserStats {
  total: number;
  active: number;
  withFutureEvents: number;
  admin: number;
}

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findAll(options?: { page: number; limit: number, filter: UserFilter }): Promise<{ data: User[]; total: number }>;
  save(user: CreateUserData): Promise<User>;
  update(id: number, data: UpdateUserData): Promise<User>;
  softDelete(id: number): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  existsByPhone(phone: string): Promise<boolean>;
  getStats(): Promise<UserStats>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
