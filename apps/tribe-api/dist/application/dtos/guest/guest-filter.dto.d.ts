import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { PaginationQueryDto } from '../pagination.dto.js';
export declare class GuestFilterDto extends PaginationQueryDto {
    status?: GuestStatus;
    name?: string;
    isChild?: boolean;
    attended?: boolean;
}
