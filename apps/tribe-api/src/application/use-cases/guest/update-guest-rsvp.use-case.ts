import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
import * as QRCode from 'qrcode';

interface UpdateGuestRSVPInput {
  id: number;
  status: GuestStatus;
}

export interface UpdateGuestRSVPOutput {
  guest: GuestResponseDto;
  qrCode?: string;
}

@Injectable()
export class UpdateGuestRSVPUseCase
  implements IUseCase<UpdateGuestRSVPInput, UpdateGuestRSVPOutput>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: UpdateGuestRSVPInput): Promise<UpdateGuestRSVPOutput> {
    const guest = await this.guestRepository.findById(input.id);
    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const updated = await this.guestRepository.update(guest.id, {
      status: input.status,
    });

    let qrCode: string | undefined;
    if (input.status === GuestStatus.CONFIRMED) {
      qrCode = await this.generateQrCode(updated.id);
    }

    return {
      guest: GuestResponseDto.fromDomain(updated),
      qrCode,
    };
  }

  private async generateQrCode(guestId: number): Promise<string> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:5173';
    const checkInUrl = `${frontendUrl}/admin/check-in/${guestId}`;
    return QRCode.toDataURL(checkInUrl);
  }
}
