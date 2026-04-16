import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { CreateGuestDto } from '../../dtos/guest/create-guest.dto.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
interface CreateGuestInput {
    eventId: number;
    data: CreateGuestDto;
}
export declare class CreateGuestUseCase implements IUseCase<CreateGuestInput, GuestResponseDto> {
    private readonly guestRepository;
    constructor(guestRepository: IGuestRepository);
    execute(input: CreateGuestInput): Promise<GuestResponseDto>;
    private validateResponsible;
}
export {};
