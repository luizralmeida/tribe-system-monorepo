import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { UpdateGuestDto } from '../../dtos/guest/update-guest.dto.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
interface UpdateGuestInput {
    id: number;
    eventId: number;
    data: UpdateGuestDto;
}
export declare class UpdateGuestUseCase implements IUseCase<UpdateGuestInput, GuestResponseDto> {
    private readonly guestRepository;
    constructor(guestRepository: IGuestRepository);
    execute(input: UpdateGuestInput): Promise<GuestResponseDto>;
}
export {};
