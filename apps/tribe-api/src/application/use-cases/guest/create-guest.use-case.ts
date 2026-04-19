import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { CreateGuestDto } from '../../dtos/guest/create-guest.dto.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';

interface CreateGuestInput {
  eventId: number;
  data: CreateGuestDto;
}

@Injectable()
export class CreateGuestUseCase
  implements IUseCase<CreateGuestInput, GuestResponseDto>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
  ) {}

  async execute(input: CreateGuestInput): Promise<GuestResponseDto> {
    if (input.data.isChild) {
      await this.validateResponsible(input.data.responsibleId!, input.eventId);
    }

    const guest = await this.guestRepository.save({
      name: input.data.name,
      phone: input.data.phone,
      email: input.data.email,
      status: input.data.status ?? GuestStatus.NOT_CONFIRMED,
      attended: false,
      eventId: input.eventId,
      responsibleId: input.data.responsibleId ?? 0,
      isChild: input.data.isChild,
      age: input.data.age,
    });

    return GuestResponseDto.fromDomain(guest);
  }

  private async validateResponsible(
    responsibleId: number,
    eventId: number,
  ): Promise<void> {
    const responsible = await this.guestRepository.findById(responsibleId);

    if (!responsible || responsible.eventId !== eventId) {
      throw new BadRequestException(
        'Responsible guest not found in this event',
      );
    }
  }
}
