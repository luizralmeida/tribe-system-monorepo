import { Repository } from 'typeorm';
import { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
import { UserEvent } from '../../../domain/entities/user-event.entity.js';
import { UserEventTypeOrmEntity } from '../entities/user-event.typeorm-entity.js';
export declare class UserEventTypeOrmRepository implements IUserEventRepository {
    private readonly ormRepository;
    constructor(ormRepository: Repository<UserEventTypeOrmEntity>);
    findByUserId(userId: number): Promise<UserEvent[]>;
    findByEventId(eventId: number): Promise<UserEvent[]>;
    exists(userId: number, eventId: number): Promise<boolean>;
    associate(userId: number, eventId: number): Promise<UserEvent>;
    dissociate(userId: number, eventId: number): Promise<void>;
    private toDomain;
}
