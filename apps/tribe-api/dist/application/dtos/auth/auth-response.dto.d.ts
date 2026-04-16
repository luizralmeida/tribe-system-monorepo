import { UserRole } from '../../../domain/enums/user-role.enum.js';
export declare class AuthResponseDto {
    readonly accessToken: string;
    readonly user: AuthUserDto;
    constructor(props: {
        accessToken: string;
        user: AuthUserDto;
    });
}
export declare class AuthUserDto {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly role: UserRole;
    constructor(props: {
        id: number;
        name: string;
        email: string;
        role: UserRole;
    });
}
