import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';

interface DeleteGuestInput {
  id: number;
  eventId: number;
}

@Injectable()
export class DeleteGuestUseCase implements IUseCase<DeleteGuestInput, void> {
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
  ) {}

  async execute(input: DeleteGuestInput): Promise<void> {
    const guest = await this.guestRepository.findById(input.id);

    if (!guest || guest.eventId !== input.eventId) {
      throw new NotFoundException('Guest not found in this event');
    }

    if (!guest.isChild) {
      await this.guestRepository.softDeleteByResponsibleId(input.id);
    }

    await this.guestRepository.softDelete(input.id);
  }
}
