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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_js_1 = require("../../infrastructure/auth/decorators/roles.decorator.js");
const user_role_enum_js_1 = require("../../domain/enums/user-role.enum.js");
const create_event_use_case_js_1 = require("../../application/use-cases/event/create-event.use-case.js");
const find_events_use_case_js_1 = require("../../application/use-cases/event/find-events.use-case.js");
const find_event_by_id_use_case_js_1 = require("../../application/use-cases/event/find-event-by-id.use-case.js");
const find_event_with_users_use_case_js_1 = require("../../application/use-cases/event/find-event-with-users.use-case.js");
const update_event_use_case_js_1 = require("../../application/use-cases/event/update-event.use-case.js");
const delete_event_use_case_js_1 = require("../../application/use-cases/event/delete-event.use-case.js");
const associate_user_event_use_case_js_1 = require("../../application/use-cases/event/associate-user-event.use-case.js");
const create_event_dto_js_1 = require("../../application/dtos/event/create-event.dto.js");
const update_event_dto_js_1 = require("../../application/dtos/event/update-event.dto.js");
const associate_user_event_dto_js_1 = require("../../application/dtos/event/associate-user-event.dto.js");
const pagination_dto_js_1 = require("../../application/dtos/pagination.dto.js");
let EventController = class EventController {
    createEventUseCase;
    findEventsUseCase;
    findEventByIdUseCase;
    findEventWithUsersUseCase;
    updateEventUseCase;
    deleteEventUseCase;
    associateUserEventUseCase;
    dissociateUserEventUseCase;
    constructor(createEventUseCase, findEventsUseCase, findEventByIdUseCase, findEventWithUsersUseCase, updateEventUseCase, deleteEventUseCase, associateUserEventUseCase, dissociateUserEventUseCase) {
        this.createEventUseCase = createEventUseCase;
        this.findEventsUseCase = findEventsUseCase;
        this.findEventByIdUseCase = findEventByIdUseCase;
        this.findEventWithUsersUseCase = findEventWithUsersUseCase;
        this.updateEventUseCase = updateEventUseCase;
        this.deleteEventUseCase = deleteEventUseCase;
        this.associateUserEventUseCase = associateUserEventUseCase;
        this.dissociateUserEventUseCase = dissociateUserEventUseCase;
    }
    async create(dto) {
        return this.createEventUseCase.execute(dto);
    }
    async findAll(query, req) {
        return this.findEventsUseCase.execute({
            ...query,
            userId: req.user.id,
            userRole: req.user.role,
        });
    }
    async findById(id, req) {
        return this.findEventByIdUseCase.execute({
            eventId: id,
            userId: req.user.id,
            userRole: req.user.role,
        });
    }
    async findWithUsers(id) {
        return this.findEventWithUsersUseCase.execute(id);
    }
    async update(id, dto) {
        return this.updateEventUseCase.execute({ id, data: dto });
    }
    async delete(id) {
        return this.deleteEventUseCase.execute(id);
    }
    async associateUser(eventId, dto) {
        return this.associateUserEventUseCase.execute({
            eventId,
            userId: dto.userId,
        });
    }
    async dissociateUser(eventId, userId) {
        return this.dissociateUserEventUseCase.execute({ eventId, userId });
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_js_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT, user_role_enum_js_1.UserRole.VIEW),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_js_1.PaginationQueryDto, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT, user_role_enum_js_1.UserRole.VIEW),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/users'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findWithUsers", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_event_dto_js_1.UpdateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/users'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, associate_user_event_dto_js_1.AssociateUserEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "associateUser", null);
__decorate([
    (0, common_1.Delete)(':id/users/:userId'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "dissociateUser", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [create_event_use_case_js_1.CreateEventUseCase,
        find_events_use_case_js_1.FindEventsUseCase,
        find_event_by_id_use_case_js_1.FindEventByIdUseCase,
        find_event_with_users_use_case_js_1.FindEventWithUsersUseCase,
        update_event_use_case_js_1.UpdateEventUseCase,
        delete_event_use_case_js_1.DeleteEventUseCase,
        associate_user_event_use_case_js_1.AssociateUserEventUseCase,
        associate_user_event_use_case_js_1.DissociateUserEventUseCase])
], EventController);
//# sourceMappingURL=event.controller.js.map