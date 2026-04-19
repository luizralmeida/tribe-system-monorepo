import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
interface CheckInGuestInput {
    id: number;
}
export declare class CheckInGuestUseCase implements IUseCase<CheckInGuestInput, GuestResponseDto> {
    private readonly guestRepository;
    constructor(guestRepository: IGuestRepository);
    execute(input: CheckInGuestInput): Promise<GuestResponseDto>;
}
export {};
