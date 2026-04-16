import { BaseEntity } from './entity.base.js';

export interface EventProps {
  id: number;
  name: string | null;
  addressId: number;
  date: Date;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class Event extends BaseEntity {
  readonly name: string | null;
  readonly addressId: number;
  readonly date: Date;

  constructor(props: EventProps) {
    super(props);
    this.name = props.name;
    this.addressId = props.addressId;
    this.date = props.date;
  }
}
