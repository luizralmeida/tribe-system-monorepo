import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import { GuestEventResponseDto } from '../../dtos/guest/guest-event-response.dto.js';

interface GetGuestByIdInput {
  id: number;
}

@Injectable()
export class GetGuestByIdUseCase
  implements IUseCase<GetGuestByIdInput, GuestEventResponseDto>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
  ) {}

  async execute(input: GetGuestByIdInput): Promise<GuestEventResponseDto> {
    const guest = await this.guestRepository.findById(input.id);
    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const event = await this.eventRepository.findById(guest.eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return GuestEventResponseDto.fromDomainWithEvent(guest, event);
  }
}
