import { Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { DashboardResponseDto } from '../../dtos/guest/dashboard-response.dto.js';

@Injectable()
export class GetEventDashboardUseCase
  implements IUseCase<number, DashboardResponseDto>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
  ) {}

  async execute(eventId: number): Promise<DashboardResponseDto> {
    const dashboard = await this.guestRepository.getDashboard(eventId);
    return new DashboardResponseDto(dashboard);
  }
}
