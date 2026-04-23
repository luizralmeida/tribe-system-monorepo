import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { EventTypeOrmEntity } from './event.typeorm-entity.js';
export declare class GuestTypeOrmEntity {
    id: number;
    name: string;
    phone: string;
    status: GuestStatus;
    attended: boolean;
    eventId: number;
    email: string | null;
    responsibleId: number | null;
    isChild: boolean;
    age?: number;
    event?: EventTypeOrmEntity;
    responsible?: GuestTypeOrmEntity;
    companions?: GuestTypeOrmEntity[];
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
