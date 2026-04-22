import { BaseEntity } from './entity.base.js';
import { UserRole } from '../enums/user-role.enum.js';
export interface UserProps {
    id: number;
    name: string;
    password: string;
    phone: string;
    email: string;
    role: UserRole;
    active: boolean;
    eventIds?: number[];
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}
export declare class User extends BaseEntity {
    readonly name: string;
    readonly password: string;
    readonly phone: string;
    readonly email: string;
    readonly role: UserRole;
    readonly active: boolean;
    readonly eventIds?: number[];
    constructor(props: UserProps);
    isSuper(): boolean;
    canEdit(): boolean;
}
