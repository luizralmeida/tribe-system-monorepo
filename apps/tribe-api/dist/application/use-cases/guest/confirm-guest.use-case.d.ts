import { JwtService } from '@nestjs/jwt';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
interface ConfirmGuestInput {
    token: string;
}
export interface ConfirmGuestOutput {
    guest: GuestResponseDto;
    qrCode: string;
}
export declare class ConfirmGuestUseCase implements IUseCase<ConfirmGuestInput, ConfirmGuestOutput> {
    private readonly guestRepository;
    private readonly jwtService;
    constructor(guestRepository: IGuestRepository, jwtService: JwtService);
    execute(input: ConfirmGuestInput): Promise<ConfirmGuestOutput>;
    private generateQrCode;
}
export {};
