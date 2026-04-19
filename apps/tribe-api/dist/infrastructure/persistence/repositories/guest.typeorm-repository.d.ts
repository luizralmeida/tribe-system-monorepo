import { Repository } from 'typeorm';
import type { IGuestRepository, GuestFilters, GuestDashboard, CreateGuestData, UpdateGuestData } from '../../../domain/repositories/guest.repository.interface.js';
import { Guest } from '../../../domain/entities/guest.entity.js';
import { GuestTypeOrmEntity } from '../entities/guest.typeorm-entity.js';
export declare class GuestTypeOrmRepository implements IGuestRepository {
    private readonly ormRepository;
    constructor(ormRepository: Repository<GuestTypeOrmEntity>);
    findById(id: number): Promise<Guest | null>;
    findByPhone(phone: string): Promise<Guest[]>;
    findByEventId(filters: GuestFilters): Promise<{
        data: Guest[];
        total: number;
    }>;
    findDependents(responsibleId: number): Promise<Guest[]>;
    save(guest: CreateGuestData): Promise<Guest>;
    saveBulk(guests: CreateGuestData[]): Promise<Guest[]>;
    update(id: number, data: UpdateGuestData): Promise<Guest>;
    softDelete(id: number): Promise<void>;
    softDeleteByResponsibleId(responsibleId: number): Promise<void>;
    updateDependentsContact(responsibleId: number, data: {
        email?: string;
        phone?: string;
    }): Promise<void>;
    getDashboard(eventId: number): Promise<GuestDashboard>;
    private applyFilters;
    private toOrmData;
    private toDomain;
}
