import { BrazilianState } from './enums';

export interface Address {
  id: number;
  name: string | null;
  street: string;
  neighborhood: string;
  number: string;
  complement: string;
  city: string;
  state: BrazilianState;
  country: string;
  createdAt: string;
  updatedAt: string | null;
}
