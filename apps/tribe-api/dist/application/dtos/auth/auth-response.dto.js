"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserDto = exports.AuthResponseDto = void 0;
class AuthResponseDto {
    accessToken;
    user;
    constructor(props) {
        this.accessToken = props.accessToken;
        this.user = props.user;
    }
}
exports.AuthResponseDto = AuthResponseDto;
class AuthUserDto {
    id;
    name;
    email;
    role;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.role = props.role;
    }
}
exports.AuthUserDto = AuthUserDto;
//# sourceMappingURL=auth-response.dto.js.map