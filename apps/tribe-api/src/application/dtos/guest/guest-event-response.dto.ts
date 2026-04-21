import { GuestResponseDto } from './guest-response.dto.js';
import { EventResponseDto } from '../event/event-response.dto.js';
import { Guest } from '../../../domain/entities/guest.entity.js';
import { Event } from '../../../domain/entities/event.entity.js';

export class GuestEventResponseDto extends GuestResponseDto {
  readonly event: EventResponseDto;

  constructor(guest: Guest, event: Event, companions?: Guest[], qrCode?: string) {
    super(guest, companions, qrCode);
    this.event = EventResponseDto.fromDomain(event);
  }

  static fromDomainWithEvent(guest: Guest, event: Event, companions?: Guest[], qrCode?: string): GuestEventResponseDto {
    return new GuestEventResponseDto(guest, event, companions, qrCode);
  }
}
