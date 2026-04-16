import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import { UpdateEventDto } from '../../dtos/event/update-event.dto.js';
import { EventResponseDto } from '../../dtos/event/event-response.dto.js';

interface UpdateEventInput {
  id: number;
  data: UpdateEventDto;
}

@Injectable()
export class UpdateEventUseCase
  implements IUseCase<UpdateEventInput, EventResponseDto>
{
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
  ) {}

  async execute(input: UpdateEventInput): Promise<EventResponseDto> {
    const existing = await this.eventRepository.findById(input.id);
    if (!existing) {
      throw new NotFoundException(`Event with id ${input.id} not found`);
    }

    const updateData: Record<string, unknown> = {};
    if (input.data.name !== undefined) updateData.name = input.data.name;
    if (input.data.addressId !== undefined) updateData.addressId = input.data.addressId;
    if (input.data.date !== undefined) updateData.date = new Date(input.data.date);

    const event = await this.eventRepository.update(input.id, updateData);
    return EventResponseDto.fromDomain(event);
  }
}
