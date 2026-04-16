"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = void 0;
class UserResponseDto {
    id;
    name;
    phone;
    email;
    role;
    active;
    createdAt;
    updatedAt;
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.phone = user.phone;
        this.email = user.email;
        this.role = user.role;
        this.active = user.active;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
    static fromDomain(user) {
        return new UserResponseDto(user);
    }
}
exports.UserResponseDto = UserResponseDto;
//# sourceMappingURL=user-response.dto.js.map