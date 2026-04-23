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
exports.CreateEventUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_repository_interface_js_1 = require("../../../domain/repositories/event.repository.interface.js");
const address_repository_interface_js_1 = require("../../../domain/repositories/address.repository.interface.js");
const event_response_dto_js_1 = require("../../dtos/event/event-response.dto.js");
let CreateEventUseCase = class CreateEventUseCase {
    eventRepository;
    addressRepository;
    constructor(eventRepository, addressRepository) {
        this.eventRepository = eventRepository;
        this.addressRepository = addressRepository;
    }
    async execute(input) {
        let addressId = input.addressId;
        if (input.address) {
            const newAddress = await this.addressRepository.save({
                ...input.address,
                name: input.address.name ?? null,
                complement: input.address.complement ?? '',
                country: input.address.country ?? 'Brasil',
            });
            addressId = newAddress.id;
        }
        else if (addressId) {
            const address = await this.addressRepository.findById(addressId);
            if (!address) {
                throw new common_1.NotFoundException(`Address with id ${addressId} not found`);
            }
        }
        else {
            throw new common_1.BadRequestException('Either address or addressId must be provided');
        }
        const event = await this.eventRepository.save({
            name: input.name ?? null,
            addressId: addressId,
            date: new Date(input.date),
        });
        return event_response_dto_js_1.EventResponseDto.fromDomain(event);
    }
};
exports.CreateEventUseCase = CreateEventUseCase;
exports.CreateEventUseCase = CreateEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_repository_interface_js_1.EVENT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(address_repository_interface_js_1.ADDRESS_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], CreateEventUseCase);
//# sourceMappingURL=create-event.use-case.js.map