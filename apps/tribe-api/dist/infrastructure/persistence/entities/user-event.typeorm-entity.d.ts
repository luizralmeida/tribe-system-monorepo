import { UserTypeOrmEntity } from './user.typeorm-entity.js';
import { EventTypeOrmEntity } from './event.typeorm-entity.js';
export declare class UserEventTypeOrmEntity {
    userId: number;
    eventId: number;
    user?: UserTypeOrmEntity;
    event?: EventTypeOrmEntity;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
