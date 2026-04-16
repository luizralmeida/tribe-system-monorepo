import { Guest } from '../../../domain/entities/guest.entity.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
export declare class GuestResponseDto {
    readonly id: number;
    readonly name: string;
    readonly phone: string;
    readonly status: GuestStatus;
    readonly attended: boolean;
    readonly eventId: number;
    readonly email: string;
    readonly responsibleId: number;
    readonly isChild: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
    constructor(guest: Guest);
    static fromDomain(guest: Guest): GuestResponseDto;
}
