import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import { GuestEventResponseDto } from '../../dtos/guest/guest-event-response.dto.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import * as QRCode from 'qrcode';
import { Logger } from '@nestjs/common';

interface GetGuestByIdInput {
  id: number;
}

@Injectable()
export class GetGuestByIdUseCase
  implements IUseCase<GetGuestByIdInput, GuestEventResponseDto>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(GetGuestByIdUseCase.name)

  async execute(input: GetGuestByIdInput): Promise<GuestEventResponseDto> {
    this.logger.debug("[execute] Getting Guest by Id");

    const { guest, event } = await this.validateAndReturnEntities(input.id);
    const companions = await this.guestRepository.findByCompanionId(guest.id);

    let qrCode: string | undefined;
    if (guest.status === GuestStatus.CONFIRMED) {
      qrCode = await this.generateQrCode(guest.id);
    }

    this.logger.log("[execute] Guest found", guest);
    return GuestEventResponseDto.fromDomainWithEvent(guest, event, companions, qrCode);
  }

  private async generateQrCode(guestId: number): Promise<string> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:5173';
    const checkInUrl = `${frontendUrl}/admin/check-in/${guestId}`;
    return QRCode.toDataURL(checkInUrl);
  }

  private async validateAndReturnEntities(id: number) {
    const guest = await this.guestRepository.findById(id);

    if (!guest) {
      this.logger.error("[execute::validateAndReturnEntities] Guest not found", id);
      throw new NotFoundException('Guest not found');
    }

    const event = await this.eventRepository.findById(guest.eventId);
    if (!event) {
      this.logger.error("[execute::validateAndReturnEntities] Event not found", guest.eventId);
      throw new NotFoundException('Event not found');
    }

    return { guest, event };
  }
}
