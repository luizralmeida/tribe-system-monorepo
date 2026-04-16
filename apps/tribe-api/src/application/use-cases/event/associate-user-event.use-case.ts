import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import type { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
import { USER_EVENT_REPOSITORY } from '../../../domain/repositories/user-event.repository.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { UserEvent } from '../../../domain/entities/user-event.entity.js';

interface AssociateInput {
  eventId: number;
  userId: number;
}

interface DissociateInput {
  eventId: number;
  userId: number;
}

@Injectable()
export class AssociateUserEventUseCase
  implements IUseCase<AssociateInput, UserEvent>
{
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
    @Inject(USER_EVENT_REPOSITORY) private readonly userEventRepository: IUserEventRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: AssociateInput): Promise<UserEvent> {
    await this.validateEntities(input.eventId, input.userId);

    const alreadyExists = await this.userEventRepository.exists(
      input.userId,
      input.eventId,
    );
    if (alreadyExists) {
      throw new ConflictException('User is already associated to this event');
    }

    return this.userEventRepository.associate(input.userId, input.eventId);
  }

  private async validateEntities(
    eventId: number,
    userId: number,
  ): Promise<void> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }
}

@Injectable()
export class DissociateUserEventUseCase
  implements IUseCase<DissociateInput, void>
{
  constructor(
    @Inject(USER_EVENT_REPOSITORY) private readonly userEventRepository: IUserEventRepository,
  ) {}

  async execute(input: DissociateInput): Promise<void> {
    const exists = await this.userEventRepository.exists(
      input.userId,
      input.eventId,
    );
    if (!exists) {
      throw new NotFoundException('User is not associated to this event');
    }

    await this.userEventRepository.dissociate(input.userId, input.eventId);
  }
}
