import { UserRole } from '../../../domain/enums/user-role.enum.js';
import { UserEventTypeOrmEntity } from './user-event.typeorm-entity.js';
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
    userEvents?: UserEventTypeOrmEntity[];
}
