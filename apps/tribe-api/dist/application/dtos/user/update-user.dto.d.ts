import { UserRole } from '../../../domain/enums/user-role.enum.js';
export declare class UpdateUserDto {
    name?: string;
    password?: string;
    phone?: string;
    email?: string;
    role?: UserRole;
    active?: boolean;
    eventIds?: number[];
}
