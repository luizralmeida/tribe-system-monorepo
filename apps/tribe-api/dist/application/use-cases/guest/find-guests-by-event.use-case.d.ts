import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { PaginatedResponseDto } from '../../dtos/pagination.dto.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
import { GuestFilterDto } from '../../dtos/guest/guest-filter.dto.js';
interface FindGuestsInput {
    eventId: number;
    query: GuestFilterDto;
}
export declare class FindGuestsByEventUseCase implements IUseCase<FindGuestsInput, PaginatedResponseDto<GuestResponseDto>> {
    private readonly guestRepository;
    constructor(guestRepository: IGuestRepository);
    private readonly logger;
    execute(input: FindGuestsInput): Promise<PaginatedResponseDto<GuestResponseDto>>;
}
export {};
