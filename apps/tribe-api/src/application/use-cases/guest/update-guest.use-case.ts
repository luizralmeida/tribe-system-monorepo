import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { UpdateGuestDto } from '../../dtos/guest/update-guest.dto.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';

interface UpdateGuestInput {
  id: number;
  eventId: number;
  data: UpdateGuestDto;
}

@Injectable()
export class UpdateGuestUseCase
  implements IUseCase<UpdateGuestInput, GuestResponseDto>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
  ) {}

  async execute(input: UpdateGuestInput): Promise<GuestResponseDto> {
    const guest = await this.guestRepository.findById(input.id);

    if (!guest || guest.eventId !== input.eventId) {
      throw new NotFoundException('Guest not found in this event');
    }

    const updated = await this.guestRepository.update(input.id, input.data);
    return GuestResponseDto.fromDomain(updated);
  }
}
