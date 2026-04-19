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
exports.CreateGuestUseCase = void 0;
const common_1 = require("@nestjs/common");
const guest_repository_interface_js_1 = require("../../../domain/repositories/guest.repository.interface.js");
const guest_status_enum_js_1 = require("../../../domain/enums/guest-status.enum.js");
const guest_response_dto_js_1 = require("../../dtos/guest/guest-response.dto.js");
let CreateGuestUseCase = class CreateGuestUseCase {
    guestRepository;
    constructor(guestRepository) {
        this.guestRepository = guestRepository;
    }
    async execute(input) {
        if (input.data.isChild) {
            await this.validateResponsible(input.data.responsibleId, input.eventId);
        }
        const guest = await this.guestRepository.save({
            name: input.data.name,
            phone: input.data.phone,
            email: input.data.email,
            status: input.data.status ?? guest_status_enum_js_1.GuestStatus.NOT_CONFIRMED,
            attended: false,
            eventId: input.eventId,
            responsibleId: input.data.responsibleId ?? 0,
            isChild: input.data.isChild,
            age: input.data.age,
        });
        return guest_response_dto_js_1.GuestResponseDto.fromDomain(guest);
    }
    async validateResponsible(responsibleId, eventId) {
        const responsible = await this.guestRepository.findById(responsibleId);
        if (!responsible || responsible.eventId !== eventId) {
            throw new common_1.BadRequestException('Responsible guest not found in this event');
        }
    }
};
exports.CreateGuestUseCase = CreateGuestUseCase;
exports.CreateGuestUseCase = CreateGuestUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(guest_repository_interface_js_1.GUEST_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateGuestUseCase);
//# sourceMappingURL=create-guest.use-case.js.map