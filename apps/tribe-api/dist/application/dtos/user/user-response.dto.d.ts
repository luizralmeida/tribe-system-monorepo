import { UserRole } from '../../../domain/enums/user-role.enum.js';
import { User } from '../../../domain/entities/user.entity.js';
export declare class UserResponseDto {
    readonly id: number;
    readonly name: string;
    readonly phone: string;
    readonly email: string;
    readonly role: UserRole;
    readonly active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
    readonly eventIds?: number[];
    constructor(user: User);
    static fromDomain(user: User): UserResponseDto;
}
