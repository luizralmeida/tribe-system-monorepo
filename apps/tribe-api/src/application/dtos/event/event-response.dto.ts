import { Event } from '../../../domain/entities/event.entity.js';
import { AddressResponseDto } from '../address/address-response.dto.js';

export class EventResponseDto {
  readonly id: number;
  readonly name: string | null;
  readonly addressId: number;
  readonly date: Date;
  readonly address?: AddressResponseDto;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;

  constructor(event: Event) {
    this.id = event.id;
    this.name = event.name;
    this.addressId = event.addressId;
    this.date = event.date;
    this.createdAt = event.createdAt;
    this.updatedAt = event.updatedAt;
    if (event.address) {
      this.address = AddressResponseDto.fromDomain(event.address);
    }
  }

  static fromDomain(event: Event): EventResponseDto {
    return new EventResponseDto(event);
  }
}

export class EventWithUsersResponseDto extends EventResponseDto {
  readonly users: EventUserDto[];

  constructor(event: Event, users: EventUserDto[]) {
    super(event);
    this.users = users;
  }
}

export class EventUserDto {
  readonly userId: number;
  readonly name?: string;
  readonly email?: string;

  constructor(props: { userId: number; name?: string; email?: string }) {
    this.userId = props.userId;
    this.name = props.name;
    this.email = props.email;
  }
}
