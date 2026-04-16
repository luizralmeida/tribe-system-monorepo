import { BaseEntity } from './entity.base.js';
import { GuestStatus } from '../enums/guest-status.enum.js';
export interface GuestProps {
    id: number;
    name: string;
    phone: string;
    status: GuestStatus;
    attended: boolean;
    eventId: number;
    email: string;
    responsibleId: number;
    isChild: boolean;
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
    readonly email: string;
    readonly responsibleId: number;
    readonly isChild: boolean;
    constructor(props: GuestProps);
    isConfirmed(): boolean;
    isDependent(): boolean;
}
