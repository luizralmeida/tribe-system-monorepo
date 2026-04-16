import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import type { IAddressRepository } from '../../../domain/repositories/address.repository.interface.js';
import { CreateEventDto } from '../../dtos/event/create-event.dto.js';
import { EventResponseDto } from '../../dtos/event/event-response.dto.js';
export declare class CreateEventUseCase implements IUseCase<CreateEventDto, EventResponseDto> {
    private readonly eventRepository;
    private readonly addressRepository;
    constructor(eventRepository: IEventRepository, addressRepository: IAddressRepository);
    execute(input: CreateEventDto): Promise<EventResponseDto>;
}
