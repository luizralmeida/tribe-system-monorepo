import type { Guest } from '../entities/guest.entity.js';
import type { GuestStatus } from '../enums/guest-status.enum.js';
export interface GuestFilters {
    eventId: number;
    status?: GuestStatus;
    name?: string;
    isChild?: boolean;
    attended?: boolean;
    page: number;
    limit: number;
}
export interface GuestDashboard {
    total: number;
    confirmed: number;
    notConfirmed: number;
    attended: number;
}
export interface CreateGuestData {
    name: string;
    phone: string;
    email: string;
    status: GuestStatus;
    attended: boolean;
    eventId: number;
    responsibleId: number;
    isChild: boolean;
}
export interface UpdateGuestData {
    name?: string;
    phone?: string;
    email?: string;
    status?: GuestStatus;
    attended?: boolean;
    isChild?: boolean;
}
export interface IGuestRepository {
    findById(id: number): Promise<Guest | null>;
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
    getDashboard(eventId: number): Promise<GuestDashboard>;
}
export declare const GUEST_REPOSITORY: unique symbol;
