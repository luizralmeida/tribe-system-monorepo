import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EventStatsResponseDto } from '../../dtos/event/event-stats.dto.js';
import { UserRole } from '../../../domain/enums/user-role.enum.js';
export declare class GetEventStatsUseCase {
    private readonly eventRepository;
    constructor(eventRepository: IEventRepository);
    execute(input: {
        userId: number;
        userRole: UserRole;
    }): Promise<EventStatsResponseDto>;
}
