import { CreateGuestUseCase } from '../../application/use-cases/guest/create-guest.use-case.js';
import { FindGuestsByEventUseCase } from '../../application/use-cases/guest/find-guests-by-event.use-case.js';
import { UpdateGuestUseCase } from '../../application/use-cases/guest/update-guest.use-case.js';
import { DeleteGuestUseCase } from '../../application/use-cases/guest/delete-guest.use-case.js';
import { ConfirmGuestUseCase } from '../../application/use-cases/guest/confirm-guest.use-case.js';
import { UploadGuestsSpreadsheetUseCase } from '../../application/use-cases/guest/upload-guests-spreadsheet.use-case.js';
import { GetEventDashboardUseCase } from '../../application/use-cases/guest/get-event-dashboard.use-case.js';
import { CreateGuestDto } from '../../application/dtos/guest/create-guest.dto.js';
import { UpdateGuestDto } from '../../application/dtos/guest/update-guest.dto.js';
import { GuestFilterDto } from '../../application/dtos/guest/guest-filter.dto.js';
interface MulterFile {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
}
export declare class GuestController {
    private readonly createGuestUseCase;
    private readonly findGuestsByEventUseCase;
    private readonly updateGuestUseCase;
    private readonly deleteGuestUseCase;
    private readonly confirmGuestUseCase;
    private readonly uploadGuestsSpreadsheetUseCase;
    private readonly getEventDashboardUseCase;
    constructor(createGuestUseCase: CreateGuestUseCase, findGuestsByEventUseCase: FindGuestsByEventUseCase, updateGuestUseCase: UpdateGuestUseCase, deleteGuestUseCase: DeleteGuestUseCase, confirmGuestUseCase: ConfirmGuestUseCase, uploadGuestsSpreadsheetUseCase: UploadGuestsSpreadsheetUseCase, getEventDashboardUseCase: GetEventDashboardUseCase);
    findByEvent(eventId: number, filters: GuestFilterDto): Promise<import("../../application/dtos/pagination.dto.js").PaginatedResponseDto<import("../../application/dtos/guest/guest-response.dto.js").GuestResponseDto>>;
    getDashboard(eventId: number): Promise<import("../../application/dtos/guest/dashboard-response.dto.js").DashboardResponseDto>;
    create(eventId: number, dto: CreateGuestDto): Promise<import("../../application/dtos/guest/guest-response.dto.js").GuestResponseDto>;
    upload(eventId: number, file: MulterFile): Promise<import("../../application/use-cases/guest/upload-guests-spreadsheet.use-case.js").UploadOutput>;
    update(eventId: number, id: number, dto: UpdateGuestDto): Promise<import("../../application/dtos/guest/guest-response.dto.js").GuestResponseDto>;
    delete(eventId: number, id: number): Promise<void>;
    confirm(token: string): Promise<import("../../application/use-cases/guest/confirm-guest.use-case.js").ConfirmGuestOutput>;
}
export {};
