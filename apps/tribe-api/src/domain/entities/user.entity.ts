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

export class User extends BaseEntity {
  readonly name: string;
  readonly password: string;
  readonly phone: string;
  readonly email: string;
  readonly role: UserRole;
  readonly active: boolean;
  readonly eventIds?: number[];

  constructor(props: UserProps) {
    super(props);
    this.name = props.name;
    this.password = props.password;
    this.phone = props.phone;
    this.email = props.email;
    this.role = props.role;
    this.active = props.active;
    this.eventIds = props.eventIds;
  }

  isSuper(): boolean {
    return this.role === UserRole.SUPER;
  }

  canEdit(): boolean {
    return this.role === UserRole.SUPER || this.role === UserRole.EDIT;
  }
}
