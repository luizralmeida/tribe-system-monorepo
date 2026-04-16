import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
import * as QRCode from 'qrcode';

interface ConfirmGuestInput {
  token: string;
}

export interface ConfirmGuestOutput {
  guest: GuestResponseDto;
  qrCode: string;
}

interface ConfirmationPayload {
  guestId: number;
}

@Injectable()
export class ConfirmGuestUseCase
  implements IUseCase<ConfirmGuestInput, ConfirmGuestOutput>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: ConfirmGuestInput): Promise<ConfirmGuestOutput> {
    const payload = this.jwtService.verify<ConfirmationPayload>(input.token);
    const guest = await this.guestRepository.findById(payload.guestId);

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const updated = await this.guestRepository.update(guest.id, {
      status: GuestStatus.CONFIRMED,
    });

    const qrCode = await this.generateQrCode(updated.id);

    return {
      guest: GuestResponseDto.fromDomain(updated),
      qrCode,
    };
  }

  private async generateQrCode(guestId: number): Promise<string> {
    const qrData = JSON.stringify({ guestId, type: 'event-entry' });
    return QRCode.toDataURL(qrData);
  }
}
