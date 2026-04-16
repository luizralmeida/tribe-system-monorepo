import { UserRole } from '../../../domain/enums/user-role.enum.js';
export declare class UserTypeOrmEntity {
    id: number;
    name: string;
    password: string;
    phone: string;
    email: string;
    role: UserRole;
    active: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
