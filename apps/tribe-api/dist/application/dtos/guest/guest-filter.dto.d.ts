import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { PaginationWithFilterQueryDto } from '../pagination.dto.js';
export declare class GuestFilterDto extends PaginationWithFilterQueryDto {
    status?: GuestStatus;
    name?: string;
    isChild?: boolean;
    attended?: boolean;
    onlyPrimary?: boolean;
}
