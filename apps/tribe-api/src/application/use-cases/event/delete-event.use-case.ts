import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';

@Injectable()
export class DeleteEventUseCase implements IUseCase<number, void> {
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    await this.eventRepository.softDelete(id);
  }
}
