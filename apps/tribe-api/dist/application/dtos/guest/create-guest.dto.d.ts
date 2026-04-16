import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
export declare class CreateGuestDto {
    name: string;
    phone: string;
    email: string;
    status?: GuestStatus;
    isChild: boolean;
    responsibleId?: number;
}
