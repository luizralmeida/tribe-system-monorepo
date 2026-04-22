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
exports.FindEventsUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_repository_interface_js_1 = require("../../../domain/repositories/event.repository.interface.js");
const pagination_dto_js_1 = require("../../dtos/pagination.dto.js");
const event_response_dto_js_1 = require("../../dtos/event/event-response.dto.js");
const user_role_enum_js_1 = require("../../../domain/enums/user-role.enum.js");
let FindEventsUseCase = class FindEventsUseCase {
    eventRepository;
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async execute(input) {
        const { page = 1, limit = 20, name } = input;
        const options = { page, limit, name };
        const { data, total } = input.userRole === user_role_enum_js_1.UserRole.SUPER
            ? await this.eventRepository.findAll(options)
            : await this.eventRepository.findByUserId(input.userId, options);
        return new pagination_dto_js_1.PaginatedResponseDto({
            data: data.map(event_response_dto_js_1.EventResponseDto.fromDomain),
            total,
            page,
            limit,
        });
    }
};
exports.FindEventsUseCase = FindEventsUseCase;
exports.FindEventsUseCase = FindEventsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_repository_interface_js_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], FindEventsUseCase);
//# sourceMappingURL=find-events.use-case.js.map