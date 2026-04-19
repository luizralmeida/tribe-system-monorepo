import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { GuestEventResponseDto } from '../../dtos/guest/guest-event-response.dto.js';
interface FindGuestsByPhoneInput {
    phone: string;
}
export declare class FindGuestsByPhoneUseCase implements IUseCase<FindGuestsByPhoneInput, GuestEventResponseDto[]> {
    private readonly guestRepository;
    private readonly eventRepository;
    constructor(guestRepository: IGuestRepository, eventRepository: IEventRepository);
    execute(input: FindGuestsByPhoneInput): Promise<GuestEventResponseDto[]>;
}
export {};
