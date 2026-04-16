import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { PaginationQueryDto, PaginatedResponseDto } from '../../dtos/pagination.dto.js';
import { EventResponseDto } from '../../dtos/event/event-response.dto.js';
import { UserRole } from '../../../domain/enums/user-role.enum.js';
interface FindEventsInput extends PaginationQueryDto {
    userId: number;
    userRole: UserRole;
}
export declare class FindEventsUseCase implements IUseCase<FindEventsInput, PaginatedResponseDto<EventResponseDto>> {
    private readonly eventRepository;
    constructor(eventRepository: IEventRepository);
    execute(input: FindEventsInput): Promise<PaginatedResponseDto<EventResponseDto>>;
}
export {};
