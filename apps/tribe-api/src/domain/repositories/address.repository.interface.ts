import type { Address } from '../entities/address.entity.js';
import type { BrazilianState } from '../enums/brazilian-state.enum.js';

export interface CreateAddressData {
  name: string | null;
  street: string;
  neighborhood: string;
  number: string;
  complement: string;
  city: string;
  state: BrazilianState;
  country: string;
}

export interface UpdateAddressData {
  name?: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: BrazilianState;
  country?: string;
}

export interface IAddressRepository {
  findById(id: number): Promise<Address | null>;
  save(address: CreateAddressData): Promise<Address>;
  update(id: number, data: UpdateAddressData): Promise<Address>;
}

export const ADDRESS_REPOSITORY = Symbol('ADDRESS_REPOSITORY');
