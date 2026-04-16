import { Guest } from '../../../domain/entities/guest.entity.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';

export class GuestResponseDto {
  readonly id: number;
  readonly name: string;
  readonly phone: string;
  readonly status: GuestStatus;
  readonly attended: boolean;
  readonly eventId: number;
  readonly email: string;
  readonly responsibleId: number;
  readonly isChild: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;

  constructor(guest: Guest) {
    this.id = guest.id;
    this.name = guest.name;
    this.phone = guest.phone;
    this.status = guest.status;
    this.attended = guest.attended;
    this.eventId = guest.eventId;
    this.email = guest.email;
    this.responsibleId = guest.responsibleId;
    this.isChild = guest.isChild;
    this.createdAt = guest.createdAt;
    this.updatedAt = guest.updatedAt;
  }

  static fromDomain(guest: Guest): GuestResponseDto {
    return new GuestResponseDto(guest);
  }
}
