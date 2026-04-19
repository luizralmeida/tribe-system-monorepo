import { BaseEntity } from './entity.base.js';
import { Address } from './address.entity.js';

export interface EventProps {
  id: number;
  name: string | null;
  addressId: number;
  date: Date;
  address?: Address;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class Event extends BaseEntity {
  readonly name: string | null;
  readonly addressId: number;
  readonly date: Date;
  readonly address?: Address;

  constructor(props: EventProps) {
    super(props);
    this.name = props.name;
    this.addressId = props.addressId;
    this.date = props.date;
    this.address = props.address;
  }
}
