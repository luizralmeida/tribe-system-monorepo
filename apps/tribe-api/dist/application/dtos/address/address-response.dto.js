"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressResponseDto = void 0;
class AddressResponseDto {
    id;
    name;
    street;
    neighborhood;
    number;
    complement;
    city;
    state;
    country;
    createdAt;
    updatedAt;
    constructor(address) {
        this.id = address.id;
        this.name = address.name;
        this.street = address.street;
        this.neighborhood = address.neighborhood;
        this.number = address.number;
        this.complement = address.complement;
        this.city = address.city;
        this.state = address.state;
        this.country = address.country;
        this.createdAt = address.createdAt;
        this.updatedAt = address.updatedAt;
    }
    static fromDomain(address) {
        return new AddressResponseDto(address);
    }
}
exports.AddressResponseDto = AddressResponseDto;
//# sourceMappingURL=address-response.dto.js.map