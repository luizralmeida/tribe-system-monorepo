import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import type { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
import { USER_EVENT_REPOSITORY } from '../../../domain/repositories/user-event.repository.interface.js';
import { EventResponseDto } from '../../dtos/event/event-response.dto.js';
import { UserRole } from '../../../domain/enums/user-role.enum.js';

interface FindEventByIdInput {
  eventId: number;
  userId: number;
  userRole: UserRole;
}

@Injectable()
export class FindEventByIdUseCase
  implements IUseCase<FindEventByIdInput, EventResponseDto>
{
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
    @Inject(USER_EVENT_REPOSITORY) private readonly userEventRepository: IUserEventRepository,
  ) {}

  async execute(input: FindEventByIdInput): Promise<EventResponseDto> {
    const event = await this.eventRepository.findById(input.eventId);

    if (!event) {
      throw new NotFoundException(`Event with id ${input.eventId} not found`);
    }

    if (input.userRole !== UserRole.SUPER) {
      await this.validateUserAccess(input.userId, input.eventId);
    }

    return EventResponseDto.fromDomain(event);
  }

  private async validateUserAccess(
    userId: number,
    eventId: number,
  ): Promise<void> {
    const hasAccess = await this.userEventRepository.exists(userId, eventId);
    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this event');
    }
  }
}
