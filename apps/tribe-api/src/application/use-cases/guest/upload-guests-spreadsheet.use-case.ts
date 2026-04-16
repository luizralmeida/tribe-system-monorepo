import { Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
import { SpreadsheetParserService } from '../../services/spreadsheet-parser.service.js';
import type { ParsedGuest } from '../../services/spreadsheet-parser.service.js';

interface UploadInput {
  eventId: number;
  buffer: Buffer;
}

export interface UploadOutput {
  imported: number;
  guests: GuestResponseDto[];
}

@Injectable()
export class UploadGuestsSpreadsheetUseCase
  implements IUseCase<UploadInput, UploadOutput>
{
  constructor(
    @Inject(GUEST_REPOSITORY) private readonly guestRepository: IGuestRepository,
    private readonly spreadsheetParser: SpreadsheetParserService,
  ) {}

  async execute(input: UploadInput): Promise<UploadOutput> {
    const parsed = this.spreadsheetParser.parse(input.buffer);

    const { adults, children } = this.separateByType(parsed);

    const savedAdults = await this.saveAdults(adults, input.eventId);
    const responsibleMap = this.buildResponsibleMap(adults, savedAdults);
    const savedChildren = await this.saveChildren(children, input.eventId, responsibleMap);

    const allGuests = [...savedAdults, ...savedChildren];

    return {
      imported: allGuests.length,
      guests: allGuests.map(GuestResponseDto.fromDomain),
    };
  }

  private separateByType(parsed: ParsedGuest[]) {
    return {
      adults: parsed.filter((g) => !g.isChild),
      children: parsed.filter((g) => g.isChild),
    };
  }

  private async saveAdults(adults: ParsedGuest[], eventId: number) {
    if (adults.length === 0) return [];

    const guestData = adults.map((g) => ({
      name: g.name,
      phone: g.phone,
      email: g.email,
      status: GuestStatus.NOT_CONFIRMED as GuestStatus,
      attended: false,
      eventId,
      responsibleId: 0,
      isChild: false,
    }));

    return this.guestRepository.saveBulk(guestData);
  }

  private buildResponsibleMap(
    parsedAdults: ParsedGuest[],
    savedAdults: { id: number; name: string }[],
  ): Map<string, number> {
    const map = new Map<string, number>();
    parsedAdults.forEach((parsed, i) => {
      const saved = savedAdults[i];
      if (saved) {
        map.set(parsed.name.toLowerCase(), saved.id);
      }
    });
    return map;
  }

  private async saveChildren(
    children: ParsedGuest[],
    eventId: number,
    responsibleMap: Map<string, number>,
  ) {
    if (children.length === 0) return [];

    const guestData = children.map((g) => {
      const responsibleId = g.responsibleName
        ? (responsibleMap.get(g.responsibleName.toLowerCase()) ?? 0)
        : 0;

      return {
        name: g.name,
        phone: g.phone,
        email: g.email,
        status: GuestStatus.NOT_CONFIRMED as GuestStatus,
        attended: false,
        eventId,
        responsibleId,
        isChild: true,
      };
    });

    return this.guestRepository.saveBulk(guestData);
  }
}
