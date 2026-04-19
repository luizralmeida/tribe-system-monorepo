import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';

interface GetCompanionsInput {
  eventId: number;
  id: number;
}

@Injectable()
export class GetCompanionsUseCase implements IUseCase<GetCompanionsInput, GuestResponseDto[]> {
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
  ) {}

  async execute(input: GetCompanionsInput): Promise<GuestResponseDto[]> {
    const guest = await this.guestRepository.findById(input.id);

    if (!guest || guest.eventId !== input.eventId) {
      throw new NotFoundException('Guest not found in this event');
    }

    const companions = await this.guestRepository.findDependents(input.id);
    return companions.map(GuestResponseDto.fromDomain);
  }
}
