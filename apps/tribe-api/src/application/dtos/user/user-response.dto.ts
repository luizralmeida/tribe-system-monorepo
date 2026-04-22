import { UserRole } from '../../../domain/enums/user-role.enum.js';
import { User } from '../../../domain/entities/user.entity.js';

export class UserResponseDto {
  readonly id: number;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly role: UserRole;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly eventIds?: number[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.phone = user.phone;
    this.email = user.email;
    this.role = user.role;
    this.active = user.active;
    this.eventIds = user.eventIds;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static fromDomain(user: User): UserResponseDto {
    return new UserResponseDto(user);
  }
}
