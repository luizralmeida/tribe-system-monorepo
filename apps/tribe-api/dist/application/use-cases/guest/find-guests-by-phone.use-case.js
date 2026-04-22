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
exports.FindGuestsByPhoneUseCase = void 0;
const common_1 = require("@nestjs/common");
const guest_repository_interface_js_1 = require("../../../domain/repositories/guest.repository.interface.js");
const event_repository_interface_js_1 = require("../../../domain/repositories/event.repository.interface.js");
const guest_event_response_dto_js_1 = require("../../dtos/guest/guest-event-response.dto.js");
let FindGuestsByPhoneUseCase = class FindGuestsByPhoneUseCase {
    guestRepository;
    eventRepository;
    constructor(guestRepository, eventRepository) {
        this.guestRepository = guestRepository;
        this.eventRepository = eventRepository;
    }
    async execute(input) {
        const guests = await this.guestRepository.findByPhone(input.phone);
        const companions = await this.guestRepository.findByCompanionId(guests.map((g) => g.id));
        const results = await Promise.all(guests.map(async (guest) => {
            const event = await this.eventRepository.findById(guest.eventId);
            if (!event) {
                return null;
            }
            const guestCompanions = companions.filter((c) => c.responsibleId === guest.id);
            return guest_event_response_dto_js_1.GuestEventResponseDto.fromDomainWithEvent(guest, event, guestCompanions);
        }));
        return results.filter((r) => r !== null);
    }
};
exports.FindGuestsByPhoneUseCase = FindGuestsByPhoneUseCase;
exports.FindGuestsByPhoneUseCase = FindGuestsByPhoneUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(guest_repository_interface_js_1.GUEST_REPOSITORY)),
    __param(1, (0, common_1.Inject)(event_repository_interface_js_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], FindGuestsByPhoneUseCase);
//# sourceMappingURL=find-guests-by-phone.use-case.js.map