import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { UpdateEventDto } from '../../dtos/event/update-event.dto.js';
import { EventResponseDto } from '../../dtos/event/event-response.dto.js';
interface UpdateEventInput {
    id: number;
    data: UpdateEventDto;
}
export declare class UpdateEventUseCase implements IUseCase<UpdateEventInput, EventResponseDto> {
    private readonly eventRepository;
    constructor(eventRepository: IEventRepository);
    execute(input: UpdateEventInput): Promise<EventResponseDto>;
}
export {};
