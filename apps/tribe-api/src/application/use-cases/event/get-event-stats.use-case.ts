import { Inject, Injectable } from '@nestjs/common';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import { EventStatsResponseDto } from '../../dtos/event/event-stats.dto.js';
import { UserRole } from '../../../domain/enums/user-role.enum.js';

@Injectable()
export class GetEventStatsUseCase {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execute(input: { userId: number; userRole: UserRole }): Promise<EventStatsResponseDto> {
    const isSuperUser = input.userRole === UserRole.SUPER;
    
    // Admin sees all stats, common user sees only their events
    const stats = await this.eventRepository.getStats(isSuperUser ? undefined : input.userId);
    
    return {
      total: stats.total,
      completed: stats.completed,
      future: stats.future,
    };
  }
}
