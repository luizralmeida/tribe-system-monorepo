import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
export declare class UpdateGuestDto {
    name?: string;
    phone?: string;
    email?: string;
    status?: GuestStatus;
    attended?: boolean;
    isChild?: boolean;
}
