"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const guest_typeorm_entity_js_1 = require("../persistence/entities/guest.typeorm-entity.js");
const guest_typeorm_repository_js_1 = require("../persistence/repositories/guest.typeorm-repository.js");
const guest_repository_interface_js_1 = require("../../domain/repositories/guest.repository.interface.js");
const create_guest_use_case_js_1 = require("../../application/use-cases/guest/create-guest.use-case.js");
const find_guests_by_event_use_case_js_1 = require("../../application/use-cases/guest/find-guests-by-event.use-case.js");
const update_guest_use_case_js_1 = require("../../application/use-cases/guest/update-guest.use-case.js");
const delete_guest_use_case_js_1 = require("../../application/use-cases/guest/delete-guest.use-case.js");
const confirm_guest_use_case_js_1 = require("../../application/use-cases/guest/confirm-guest.use-case.js");
const upload_guests_spreadsheet_use_case_js_1 = require("../../application/use-cases/guest/upload-guests-spreadsheet.use-case.js");
const get_event_dashboard_use_case_js_1 = require("../../application/use-cases/guest/get-event-dashboard.use-case.js");
const spreadsheet_parser_service_js_1 = require("../../application/services/spreadsheet-parser.service.js");
const guest_controller_js_1 = require("../../presentation/controllers/guest.controller.js");
let GuestModule = class GuestModule {
};
exports.GuestModule = GuestModule;
exports.GuestModule = GuestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([guest_typeorm_entity_js_1.GuestTypeOrmEntity]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.getOrThrow('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION', '8h'),
                    },
                }),
            }),
        ],
        controllers: [guest_controller_js_1.GuestController],
        providers: [
            { provide: guest_repository_interface_js_1.GUEST_REPOSITORY, useClass: guest_typeorm_repository_js_1.GuestTypeOrmRepository },
            create_guest_use_case_js_1.CreateGuestUseCase,
            find_guests_by_event_use_case_js_1.FindGuestsByEventUseCase,
            update_guest_use_case_js_1.UpdateGuestUseCase,
            delete_guest_use_case_js_1.DeleteGuestUseCase,
            confirm_guest_use_case_js_1.ConfirmGuestUseCase,
            upload_guests_spreadsheet_use_case_js_1.UploadGuestsSpreadsheetUseCase,
            get_event_dashboard_use_case_js_1.GetEventDashboardUseCase,
            spreadsheet_parser_service_js_1.SpreadsheetParserService,
        ],
        exports: [guest_repository_interface_js_1.GUEST_REPOSITORY],
    })
], GuestModule);
//# sourceMappingURL=guest.module.js.map