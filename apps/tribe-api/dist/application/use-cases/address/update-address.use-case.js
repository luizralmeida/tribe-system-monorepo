"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddressUseCase = void 0;
const common_1 = require("@nestjs/common");
const address_repository_interface_js_1 = require("../../../domain/repositories/address.repository.interface.js");
const address_response_dto_js_1 = require("../../dtos/address/address-response.dto.js");
let UpdateAddressUseCase = class UpdateAddressUseCase {
    addressRepository;
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async execute(input) {
        const existing = await this.addressRepository.findById(input.id);
        if (!existing) {
            throw new common_1.NotFoundException(`Address with id ${input.id} not found`);
        }
        const address = await this.addressRepository.update(input.id, input.data);
        return address_response_dto_js_1.AddressResponseDto.fromDomain(address);
    }
};
exports.UpdateAddressUseCase = UpdateAddressUseCase;
exports.UpdateAddressUseCase = UpdateAddressUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(address_repository_interface_js_1.ADDRESS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateAddressUseCase);
//# sourceMappingURL=update-address.use-case.js.map