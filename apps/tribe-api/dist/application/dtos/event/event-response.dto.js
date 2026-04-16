"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUserDto = exports.EventWithUsersResponseDto = exports.EventResponseDto = void 0;
class EventResponseDto {
    id;
    name;
    addressId;
    date;
    createdAt;
    updatedAt;
    constructor(event) {
        this.id = event.id;
        this.name = event.name;
        this.addressId = event.addressId;
        this.date = event.date;
        this.createdAt = event.createdAt;
        this.updatedAt = event.updatedAt;
    }
    static fromDomain(event) {
        return new EventResponseDto(event);
    }
}
exports.EventResponseDto = EventResponseDto;
class EventWithUsersResponseDto extends EventResponseDto {
    users;
    constructor(event, users) {
        super(event);
        this.users = users;
    }
}
exports.EventWithUsersResponseDto = EventWithUsersResponseDto;
class EventUserDto {
    userId;
    name;
    email;
    constructor(props) {
        this.userId = props.userId;
        this.name = props.name;
        this.email = props.email;
    }
}
exports.EventUserDto = EventUserDto;
//# sourceMappingURL=event-response.dto.js.map