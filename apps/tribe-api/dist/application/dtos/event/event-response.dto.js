"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUserDto = exports.EventWithUsersResponseDto = exports.EventResponseDto = void 0;
const address_response_dto_js_1 = require("../address/address-response.dto.js");
class EventResponseDto {
    id;
    name;
    addressId;
    date;
    address;
    createdAt;
    updatedAt;
    constructor(event) {
        this.id = event.id;
        this.name = event.name;
        this.addressId = event.addressId;
        this.date = event.date;
        this.createdAt = event.createdAt;
        this.updatedAt = event.updatedAt;
        if (event.address) {
            this.address = address_response_dto_js_1.AddressResponseDto.fromDomain(event.address);
        }
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