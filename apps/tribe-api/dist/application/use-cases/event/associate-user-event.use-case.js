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
exports.DissociateUserEventUseCase = exports.AssociateUserEventUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_repository_interface_js_1 = require("../../../domain/repositories/event.repository.interface.js");
const user_event_repository_interface_js_1 = require("../../../domain/repositories/user-event.repository.interface.js");
const user_repository_interface_js_1 = require("../../../domain/repositories/user.repository.interface.js");
let AssociateUserEventUseCase = class AssociateUserEventUseCase {
    eventRepository;
    userEventRepository;
    userRepository;
    constructor(eventRepository, userEventRepository, userRepository) {
        this.eventRepository = eventRepository;
        this.userEventRepository = userEventRepository;
        this.userRepository = userRepository;
    }
    async execute(input) {
        await this.validateEntities(input.eventId, input.userId);
        const alreadyExists = await this.userEventRepository.exists(input.userId, input.eventId);
        if (alreadyExists) {
            throw new common_1.ConflictException('User is already associated to this event');
        }
        return this.userEventRepository.associate(input.userId, input.eventId);
    }
    async validateEntities(eventId, userId) {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new common_1.NotFoundException(`Event with id ${eventId} not found`);
        }
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
    }
};
exports.AssociateUserEventUseCase = AssociateUserEventUseCase;
exports.AssociateUserEventUseCase = AssociateUserEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_repository_interface_js_1.EVENT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(user_event_repository_interface_js_1.USER_EVENT_REPOSITORY)),
    __param(2, (0, common_1.Inject)(user_repository_interface_js_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AssociateUserEventUseCase);
let DissociateUserEventUseCase = class DissociateUserEventUseCase {
    userEventRepository;
    constructor(userEventRepository) {
        this.userEventRepository = userEventRepository;
    }
    async execute(input) {
        const exists = await this.userEventRepository.exists(input.userId, input.eventId);
        if (!exists) {
            throw new common_1.NotFoundException('User is not associated to this event');
        }
        await this.userEventRepository.dissociate(input.userId, input.eventId);
    }
};
exports.DissociateUserEventUseCase = DissociateUserEventUseCase;
exports.DissociateUserEventUseCase = DissociateUserEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_event_repository_interface_js_1.USER_EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DissociateUserEventUseCase);
//# sourceMappingURL=associate-user-event.use-case.js.map