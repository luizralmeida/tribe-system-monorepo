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
var GetGuestByIdUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGuestByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const guest_repository_interface_js_1 = require("../../../domain/repositories/guest.repository.interface.js");
const event_repository_interface_js_1 = require("../../../domain/repositories/event.repository.interface.js");
const guest_event_response_dto_js_1 = require("../../dtos/guest/guest-event-response.dto.js");
const common_2 = require("@nestjs/common");
let GetGuestByIdUseCase = GetGuestByIdUseCase_1 = class GetGuestByIdUseCase {
    guestRepository;
    eventRepository;
    constructor(guestRepository, eventRepository) {
        this.guestRepository = guestRepository;
        this.eventRepository = eventRepository;
    }
    logger = new common_2.Logger(GetGuestByIdUseCase_1.name);
    async execute(input) {
        this.logger.debug("[execute] Getting Guest by Id");
        const { guest, event } = await this.validateAndReturnEntities(input.id);
        const companions = await this.guestRepository.findByCompanionId(guest.id);
        this.logger.log("[execute] Guest found", guest);
        return guest_event_response_dto_js_1.GuestEventResponseDto.fromDomainWithEvent(guest, event, companions);
    }
    async validateAndReturnEntities(id) {
        const guest = await this.guestRepository.findById(id);
        if (!guest) {
            this.logger.error("[execute::validateAndReturnEntities] Guest not found", id);
            throw new common_1.NotFoundException('Guest not found');
        }
        const event = await this.eventRepository.findById(guest.eventId);
        if (!event) {
            this.logger.error("[execute::validateAndReturnEntities] Event not found", guest.eventId);
            throw new common_1.NotFoundException('Event not found');
        }
        return { guest, event };
    }
};
exports.GetGuestByIdUseCase = GetGuestByIdUseCase;
exports.GetGuestByIdUseCase = GetGuestByIdUseCase = GetGuestByIdUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(guest_repository_interface_js_1.GUEST_REPOSITORY)),
    __param(1, (0, common_1.Inject)(event_repository_interface_js_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], GetGuestByIdUseCase);
//# sourceMappingURL=get-guest-by-id.use-case.js.map