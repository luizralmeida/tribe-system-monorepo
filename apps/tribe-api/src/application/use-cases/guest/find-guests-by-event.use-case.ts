import { Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { PaginatedResponseDto, PaginationWithFilterQueryDto } from '../../dtos/pagination.dto.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
import { GuestFilterDto } from '../../dtos/guest/guest-filter.dto.js';
import { Logger } from '@nestjs/common';

interface FindGuestsInput {
  eventId: number;
  query: GuestFilterDto;
}

@Injectable()
export class FindGuestsByEventUseCase
  implements IUseCase<FindGuestsInput, PaginatedResponseDto<GuestResponseDto>>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
  ) {}
  private readonly logger = new Logger(FindGuestsByEventUseCase.name);

  async execute(
    input: FindGuestsInput,
  ): Promise<PaginatedResponseDto<GuestResponseDto>> {
    this.logger.warn("[execute] Searching for guests by event");

    const page = input.query.page ?? 1;
    const limit = input.query.limit ?? 20;

    const { data, total } = await this.guestRepository.findByEventId({
      eventId: input.eventId,
      name: input.query.search,
      attended: input.query.attended,
      status: input.query.status,
      isChild: input.query.isChild,
      onlyPrimary: input.query.onlyPrimary,
      page,
      limit,
    });

    this.logger.log("[execute] Guest's search succeeded");
    return new PaginatedResponseDto({
      data: data.map(GuestResponseDto.fromDomain),
      total,
      page,
      limit,
    });
  }
}
