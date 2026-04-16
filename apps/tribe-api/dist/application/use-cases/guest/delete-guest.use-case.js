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
exports.DeleteGuestUseCase = void 0;
const common_1 = require("@nestjs/common");
const guest_repository_interface_js_1 = require("../../../domain/repositories/guest.repository.interface.js");
let DeleteGuestUseCase = class DeleteGuestUseCase {
    guestRepository;
    constructor(guestRepository) {
        this.guestRepository = guestRepository;
    }
    async execute(input) {
        const guest = await this.guestRepository.findById(input.id);
        if (!guest || guest.eventId !== input.eventId) {
            throw new common_1.NotFoundException('Guest not found in this event');
        }
        if (!guest.isChild) {
            await this.guestRepository.softDeleteByResponsibleId(input.id);
        }
        await this.guestRepository.softDelete(input.id);
    }
};
exports.DeleteGuestUseCase = DeleteGuestUseCase;
exports.DeleteGuestUseCase = DeleteGuestUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(guest_repository_interface_js_1.GUEST_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteGuestUseCase);
//# sourceMappingURL=delete-guest.use-case.js.map