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
exports.FindEventByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_repository_interface_js_1 = require("../../../domain/repositories/event.repository.interface.js");
const user_event_repository_interface_js_1 = require("../../../domain/repositories/user-event.repository.interface.js");
const event_response_dto_js_1 = require("../../dtos/event/event-response.dto.js");
const user_role_enum_js_1 = require("../../../domain/enums/user-role.enum.js");
let FindEventByIdUseCase = class FindEventByIdUseCase {
    eventRepository;
    userEventRepository;
    constructor(eventRepository, userEventRepository) {
        this.eventRepository = eventRepository;
        this.userEventRepository = userEventRepository;
    }
    async execute(input) {
        const event = await this.eventRepository.findById(input.eventId);
        if (!event) {
            throw new common_1.NotFoundException(`Event with id ${input.eventId} not found`);
        }
        if (input.userRole !== user_role_enum_js_1.UserRole.SUPER) {
            await this.validateUserAccess(input.userId, input.eventId);
        }
        return event_response_dto_js_1.EventResponseDto.fromDomain(event);
    }
    async validateUserAccess(userId, eventId) {
        const hasAccess = await this.userEventRepository.exists(userId, eventId);
        if (!hasAccess) {
            throw new common_1.ForbiddenException('You do not have access to this event');
        }
    }
};
exports.FindEventByIdUseCase = FindEventByIdUseCase;
exports.FindEventByIdUseCase = FindEventByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_repository_interface_js_1.EVENT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(user_event_repository_interface_js_1.USER_EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], FindEventByIdUseCase);
//# sourceMappingURL=find-event-by-id.use-case.js.map