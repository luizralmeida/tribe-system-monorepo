import { Repository } from 'typeorm';
import type { IEventRepository, CreateEventData, UpdateEventData } from '../../../domain/repositories/event.repository.interface.js';
import { Event } from '../../../domain/entities/event.entity.js';
import { EventTypeOrmEntity } from '../entities/event.typeorm-entity.js';
import { UserEventTypeOrmEntity } from '../entities/user-event.typeorm-entity.js';
export declare class EventTypeOrmRepository implements IEventRepository {
    private readonly ormRepository;
    private readonly userEventRepository;
    constructor(ormRepository: Repository<EventTypeOrmEntity>, userEventRepository: Repository<UserEventTypeOrmEntity>);
    findById(id: number): Promise<Event | null>;
    findAll(options?: {
        page: number;
        limit: number;
        name?: string;
    }): Promise<{
        data: Event[];
        total: number;
    }>;
    findByUserId(userId: number, options?: {
        page: number;
        limit: number;
        name?: string;
    }): Promise<{
        data: Event[];
        total: number;
    }>;
    save(event: CreateEventData): Promise<Event>;
    update(id: number, data: UpdateEventData): Promise<Event>;
    softDelete(id: number): Promise<void>;
    getStats(userId?: number): Promise<{
        total: number;
        completed: number;
        future: number;
    }>;
    private toDomain;
}
