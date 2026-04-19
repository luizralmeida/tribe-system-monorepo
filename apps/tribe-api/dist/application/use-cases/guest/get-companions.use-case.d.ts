import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
interface GetCompanionsInput {
    eventId: number;
    id: number;
}
export declare class GetCompanionsUseCase implements IUseCase<GetCompanionsInput, GuestResponseDto[]> {
    private readonly guestRepository;
    constructor(guestRepository: IGuestRepository);
    execute(input: GetCompanionsInput): Promise<GuestResponseDto[]>;
}
export {};
