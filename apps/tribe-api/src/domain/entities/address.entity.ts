import { BaseEntity } from './entity.base.js';
import { BrazilianState } from '../enums/brazilian-state.enum.js';

export interface AddressProps {
  id: number;
  name: string | null;
  street: string;
  neighborhood: string;
  number: string;
  complement: string;
  city: string;
  state: BrazilianState;
  country: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Address extends BaseEntity {
  readonly name: string | null;
  readonly street: string;
  readonly neighborhood: string;
  readonly number: string;
  readonly complement: string;
  readonly city: string;
  readonly state: BrazilianState;
  readonly country: string;

  constructor(props: AddressProps) {
    super({ ...props, deletedAt: null });
    this.name = props.name;
    this.street = props.street;
    this.neighborhood = props.neighborhood;
    this.number = props.number;
    this.complement = props.complement;
    this.city = props.city;
    this.state = props.state;
    this.country = props.country;
  }
}
