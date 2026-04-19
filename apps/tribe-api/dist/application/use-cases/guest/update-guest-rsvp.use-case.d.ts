import { ConfigService } from '@nestjs/config';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
interface UpdateGuestRSVPInput {
    id: number;
    status: GuestStatus;
}
export interface UpdateGuestRSVPOutput {
    guest: GuestResponseDto;
    qrCode?: string;
}
export declare class UpdateGuestRSVPUseCase implements IUseCase<UpdateGuestRSVPInput, UpdateGuestRSVPOutput> {
    private readonly guestRepository;
    private readonly configService;
    constructor(guestRepository: IGuestRepository, configService: ConfigService);
    execute(input: UpdateGuestRSVPInput): Promise<UpdateGuestRSVPOutput>;
    private generateQrCode;
}
export {};
