import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import type { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
import { USER_EVENT_REPOSITORY } from '../../../domain/repositories/user-event.repository.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { EventWithUsersResponseDto, EventUserDto } from '../../dtos/event/event-response.dto.js';

@Injectable()
export class FindEventWithUsersUseCase
  implements IUseCase<number, EventWithUsersResponseDto>
{
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
    @Inject(USER_EVENT_REPOSITORY) private readonly userEventRepository: IUserEventRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(eventId: number): Promise<EventWithUsersResponseDto> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    const userEvents = await this.userEventRepository.findByEventId(eventId);

    const users = await Promise.all(
      userEvents.map(async (ue) => {
        const user = await this.userRepository.findById(ue.userId);
        return new EventUserDto({
          userId: ue.userId,
          name: user?.name,
          email: user?.email,
        });
      }),
    );

    return new EventWithUsersResponseDto(event, users);
  }
}
