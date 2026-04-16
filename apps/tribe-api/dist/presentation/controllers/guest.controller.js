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
exports.GuestController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const roles_decorator_js_1 = require("../../infrastructure/auth/decorators/roles.decorator.js");
const public_decorator_js_1 = require("../../infrastructure/auth/decorators/public.decorator.js");
const user_role_enum_js_1 = require("../../domain/enums/user-role.enum.js");
const create_guest_use_case_js_1 = require("../../application/use-cases/guest/create-guest.use-case.js");
const find_guests_by_event_use_case_js_1 = require("../../application/use-cases/guest/find-guests-by-event.use-case.js");
const update_guest_use_case_js_1 = require("../../application/use-cases/guest/update-guest.use-case.js");
const delete_guest_use_case_js_1 = require("../../application/use-cases/guest/delete-guest.use-case.js");
const confirm_guest_use_case_js_1 = require("../../application/use-cases/guest/confirm-guest.use-case.js");
const upload_guests_spreadsheet_use_case_js_1 = require("../../application/use-cases/guest/upload-guests-spreadsheet.use-case.js");
const get_event_dashboard_use_case_js_1 = require("../../application/use-cases/guest/get-event-dashboard.use-case.js");
const create_guest_dto_js_1 = require("../../application/dtos/guest/create-guest.dto.js");
const update_guest_dto_js_1 = require("../../application/dtos/guest/update-guest.dto.js");
const guest_filter_dto_js_1 = require("../../application/dtos/guest/guest-filter.dto.js");
let GuestController = class GuestController {
    createGuestUseCase;
    findGuestsByEventUseCase;
    updateGuestUseCase;
    deleteGuestUseCase;
    confirmGuestUseCase;
    uploadGuestsSpreadsheetUseCase;
    getEventDashboardUseCase;
    constructor(createGuestUseCase, findGuestsByEventUseCase, updateGuestUseCase, deleteGuestUseCase, confirmGuestUseCase, uploadGuestsSpreadsheetUseCase, getEventDashboardUseCase) {
        this.createGuestUseCase = createGuestUseCase;
        this.findGuestsByEventUseCase = findGuestsByEventUseCase;
        this.updateGuestUseCase = updateGuestUseCase;
        this.deleteGuestUseCase = deleteGuestUseCase;
        this.confirmGuestUseCase = confirmGuestUseCase;
        this.uploadGuestsSpreadsheetUseCase = uploadGuestsSpreadsheetUseCase;
        this.getEventDashboardUseCase = getEventDashboardUseCase;
    }
    async findByEvent(eventId, filters) {
        return this.findGuestsByEventUseCase.execute({ ...filters, eventId });
    }
    async getDashboard(eventId) {
        return this.getEventDashboardUseCase.execute(eventId);
    }
    async create(eventId, dto) {
        return this.createGuestUseCase.execute({ eventId, data: dto });
    }
    async upload(eventId, file) {
        return this.uploadGuestsSpreadsheetUseCase.execute({
            eventId,
            buffer: file.buffer,
        });
    }
    async update(eventId, id, dto) {
        return this.updateGuestUseCase.execute({ id, eventId, data: dto });
    }
    async delete(eventId, id) {
        return this.deleteGuestUseCase.execute({ id, eventId });
    }
    async confirm(token) {
        return this.confirmGuestUseCase.execute({ token });
    }
};
exports.GuestController = GuestController;
__decorate([
    (0, common_1.Get)('events/:eventId/guests'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT, user_role_enum_js_1.UserRole.VIEW),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, guest_filter_dto_js_1.GuestFilterDto]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "findByEvent", null);
__decorate([
    (0, common_1.Get)('events/:eventId/guests/dashboard'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT, user_role_enum_js_1.UserRole.VIEW),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Post)('events/:eventId/guests'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_guest_dto_js_1.CreateGuestDto]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('events/:eventId/guests/upload'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "upload", null);
__decorate([
    (0, common_1.Put)('events/:eventId/guests/:id'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_guest_dto_js_1.UpdateGuestDto]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('events/:eventId/guests/:id'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "delete", null);
__decorate([
    (0, public_decorator_js_1.Public)(),
    (0, common_1.Post)('guests/confirm/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "confirm", null);
exports.GuestController = GuestController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [create_guest_use_case_js_1.CreateGuestUseCase,
        find_guests_by_event_use_case_js_1.FindGuestsByEventUseCase,
        update_guest_use_case_js_1.UpdateGuestUseCase,
        delete_guest_use_case_js_1.DeleteGuestUseCase,
        confirm_guest_use_case_js_1.ConfirmGuestUseCase,
        upload_guests_spreadsheet_use_case_js_1.UploadGuestsSpreadsheetUseCase,
        get_event_dashboard_use_case_js_1.GetEventDashboardUseCase])
], GuestController);
//# sourceMappingURL=guest.controller.js.map