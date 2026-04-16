import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import type { IAddressRepository } from '../../../domain/repositories/address.repository.interface.js';
import { ADDRESS_REPOSITORY } from '../../../domain/repositories/address.repository.interface.js';
import { CreateEventDto } from '../../dtos/event/create-event.dto.js';
import { EventResponseDto } from '../../dtos/event/event-response.dto.js';

@Injectable()
export class CreateEventUseCase
  implements IUseCase<CreateEventDto, EventResponseDto>
{
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: IAddressRepository,
  ) {}

  async execute(input: CreateEventDto): Promise<EventResponseDto> {
    const address = await this.addressRepository.findById(input.addressId);
    if (!address) {
      throw new NotFoundException(`Address with id ${input.addressId} not found`);
    }

    const event = await this.eventRepository.save({
      name: input.name ?? null,
      addressId: input.addressId,
      date: new Date(input.date),
    });

    return EventResponseDto.fromDomain(event);
  }
}
