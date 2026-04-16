import { UserEvent } from '../entities/user-event.entity.js';
export interface IUserEventRepository {
    findByUserId(userId: number): Promise<UserEvent[]>;
    findByEventId(eventId: number): Promise<UserEvent[]>;
    exists(userId: number, eventId: number): Promise<boolean>;
    associate(userId: number, eventId: number): Promise<UserEvent>;
    dissociate(userId: number, eventId: number): Promise<void>;
}
export declare const USER_EVENT_REPOSITORY: unique symbol;
