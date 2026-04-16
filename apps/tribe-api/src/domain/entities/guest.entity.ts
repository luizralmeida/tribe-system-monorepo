import { BaseEntity } from './entity.base.js';
import { GuestStatus } from '../enums/guest-status.enum.js';

export interface GuestProps {
  id: number;
  name: string;
  phone: string;
  status: GuestStatus;
  attended: boolean;
  eventId: number;
  email: string;
  responsibleId: number;
  isChild: boolean;
  // todo: update entity
  age?: number;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class Guest extends BaseEntity {
  readonly name: string;
  readonly phone: string;
  readonly status: GuestStatus;
  readonly attended: boolean;
  readonly eventId: number;
  readonly email: string;
  readonly responsibleId: number;
  readonly isChild: boolean;

  constructor(props: GuestProps) {
    super(props);
    this.name = props.name;
    this.phone = props.phone;
    this.status = props.status;
    this.attended = props.attended;
    this.eventId = props.eventId;
    this.email = props.email;
    this.responsibleId = props.responsibleId;
    this.isChild = props.isChild;
  }

  isConfirmed(): boolean {
    return this.status === GuestStatus.CONFIRMED;
  }

  isDependent(): boolean {
    return this.isChild;
  }
}
