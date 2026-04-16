import { Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import { PaginationQueryDto, PaginatedResponseDto } from '../../dtos/pagination.dto.js';
import { EventResponseDto } from '../../dtos/event/event-response.dto.js';
import { UserRole } from '../../../domain/enums/user-role.enum.js';

interface FindEventsInput extends PaginationQueryDto {
  userId: number;
  userRole: UserRole;
}

@Injectable()
export class FindEventsUseCase
  implements IUseCase<FindEventsInput, PaginatedResponseDto<EventResponseDto>>
{
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
  ) {}

  async execute(
    input: FindEventsInput,
  ): Promise<PaginatedResponseDto<EventResponseDto>> {
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;

    const { data, total } = input.userRole === UserRole.SUPER
      ? await this.eventRepository.findAll({ page, limit })
      : await this.eventRepository.findByUserId(input.userId, { page, limit });

    return new PaginatedResponseDto({
      data: data.map(EventResponseDto.fromDomain),
      total,
      page,
      limit,
    });
  }
}
