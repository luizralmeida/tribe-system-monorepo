import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';

interface CheckInGuestInput {
  id: number;
  companionIds?: number[];
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

    await this.processCheckIn(input.id, input.companionIds);

    const updated = await this.guestRepository.findById(input.id);
    return GuestResponseDto.fromDomain(updated!);
  }

  private async processCheckIn(id: number, companionIds?: number[]): Promise<void> {
    const idsToCheckIn = [id, ...(companionIds || [])];
    
    await Promise.all(
      idsToCheckIn.map((guestId) => 
        this.guestRepository.update(guestId, { attended: true })
      )
    );
  }
}
