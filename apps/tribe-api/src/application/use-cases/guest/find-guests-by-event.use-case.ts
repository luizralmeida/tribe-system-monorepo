import { Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { PaginatedResponseDto } from '../../dtos/pagination.dto.js';
import { GuestFilterDto } from '../../dtos/guest/guest-filter.dto.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';

interface FindGuestsInput extends GuestFilterDto {
  eventId: number;
}

@Injectable()
export class FindGuestsByEventUseCase
  implements IUseCase<FindGuestsInput, PaginatedResponseDto<GuestResponseDto>>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
  ) {}

  async execute(
    input: FindGuestsInput,
  ): Promise<PaginatedResponseDto<GuestResponseDto>> {
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;

    const { data, total } = await this.guestRepository.findByEventId({
      eventId: input.eventId,
      status: input.status,
      name: input.name,
      isChild: input.isChild,
      attended: input.attended,
      page,
      limit,
    });

    return new PaginatedResponseDto({
      data: data.map(GuestResponseDto.fromDomain),
      total,
      page,
      limit,
    });
  }
}
