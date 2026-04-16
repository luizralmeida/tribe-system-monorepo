import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import type { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { EventWithUsersResponseDto } from '../../dtos/event/event-response.dto.js';
export declare class FindEventWithUsersUseCase implements IUseCase<number, EventWithUsersResponseDto> {
    private readonly eventRepository;
    private readonly userEventRepository;
    private readonly userRepository;
    constructor(eventRepository: IEventRepository, userEventRepository: IUserEventRepository, userRepository: IUserRepository);
    execute(eventId: number): Promise<EventWithUsersResponseDto>;
}
