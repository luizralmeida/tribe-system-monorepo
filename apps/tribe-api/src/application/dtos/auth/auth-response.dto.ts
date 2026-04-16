import { UserRole } from '../../../domain/enums/user-role.enum.js';

export class AuthResponseDto {
  readonly accessToken: string;
  readonly user: AuthUserDto;

  constructor(props: { accessToken: string; user: AuthUserDto }) {
    this.accessToken = props.accessToken;
    this.user = props.user;
  }
}

export class AuthUserDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;

  constructor(props: { id: number; name: string; email: string; role: UserRole }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.role = props.role;
  }
}
