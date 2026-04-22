import type { Event } from '../entities/event.entity.js';
export interface CreateEventData {
    name: string | null;
    addressId: number;
    date: Date;
}
export interface UpdateEventData {
    name?: string | null;
    addressId?: number;
    date?: Date;
}
export interface EventStats {
    total: number;
    completed: number;
    future: number;
}
export interface IEventRepository {
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
    getStats(userId?: number): Promise<EventStats>;
}
export declare const EVENT_REPOSITORY: unique symbol;
