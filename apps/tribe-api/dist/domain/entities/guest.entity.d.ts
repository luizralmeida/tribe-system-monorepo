import { BaseEntity } from './entity.base.js';
import { GuestStatus } from '../enums/guest-status.enum.js';
export interface GuestProps {
    id: number;
    name: string;
    phone: string;
    status: GuestStatus;
    attended: boolean;
    eventId: number;
    email?: string | null;
    responsibleId?: number | null;
    isChild: boolean;
    companionCount?: number;
    age?: number;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}
export declare class Guest extends BaseEntity {
    readonly name: string;
    readonly phone: string;
    readonly status: GuestStatus;
    readonly attended: boolean;
    readonly eventId: number;
    readonly email?: string | null;
    readonly responsibleId?: number | null;
    readonly isChild: boolean;
    readonly age?: number;
    readonly companionCount?: number;
    constructor(props: GuestProps);
    isConfirmed(): boolean;
    isDependent(): boolean;
}
