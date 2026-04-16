import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import type { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
import { EventResponseDto } from '../../dtos/event/event-response.dto.js';
import { UserRole } from '../../../domain/enums/user-role.enum.js';
interface FindEventByIdInput {
    eventId: number;
    userId: number;
    userRole: UserRole;
}
export declare class FindEventByIdUseCase implements IUseCase<FindEventByIdInput, EventResponseDto> {
    private readonly eventRepository;
    private readonly userEventRepository;
    constructor(eventRepository: IEventRepository, userEventRepository: IUserEventRepository);
    execute(input: FindEventByIdInput): Promise<EventResponseDto>;
    private validateUserAccess;
}
export {};
