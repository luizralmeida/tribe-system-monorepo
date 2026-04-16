import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestResponseDto } from '../../dtos/guest/guest-response.dto.js';
import { SpreadsheetParserService } from '../../services/spreadsheet-parser.service.js';
interface UploadInput {
    eventId: number;
    buffer: Buffer;
}
export interface UploadOutput {
    imported: number;
    guests: GuestResponseDto[];
}
export declare class UploadGuestsSpreadsheetUseCase implements IUseCase<UploadInput, UploadOutput> {
    private readonly guestRepository;
    private readonly spreadsheetParser;
    constructor(guestRepository: IGuestRepository, spreadsheetParser: SpreadsheetParserService);
    execute(input: UploadInput): Promise<UploadOutput>;
    private separateByType;
    private saveAdults;
    private buildResponsibleMap;
    private saveChildren;
}
export {};
