import { Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import { GuestEventResponseDto } from '../../dtos/guest/guest-event-response.dto.js';

interface FindGuestsByPhoneInput {
  phone: string;
}

@Injectable()
export class FindGuestsByPhoneUseCase
  implements IUseCase<FindGuestsByPhoneInput, GuestEventResponseDto[]>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
  ) {}

  async execute(input: FindGuestsByPhoneInput): Promise<GuestEventResponseDto[]> {
    const guests = await this.guestRepository.findByPhone(input.phone);
    
    const results = await Promise.all(
      guests.map(async (guest) => {
        const event = await this.eventRepository.findById(guest.eventId);
        if (!event) return null;
        return GuestEventResponseDto.fromDomainWithEvent(guest, event);
      }),
    );

    return results.filter((r): r is GuestEventResponseDto => r !== null);
  }
}
