import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';

interface CheckInGuestInput {
  id: number;
}

@Injectable()
export class CheckInGuestUseCase
  implements IUseCase<CheckInGuestInput, GuestResponseDto>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
  ) {}

  async execute(input: CheckInGuestInput): Promise<GuestResponseDto> {
    const guest = await this.guestRepository.findById(input.id);
    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const updated = await this.guestRepository.update(guest.id, {
      attended: true,
    });

    return GuestResponseDto.fromDomain(updated);
  }
}
