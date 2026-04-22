"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_typeorm_entity_js_1 = require("../persistence/entities/event.typeorm-entity.js");
const user_event_typeorm_entity_js_1 = require("../persistence/entities/user-event.typeorm-entity.js");
const event_typeorm_repository_js_1 = require("../persistence/repositories/event.typeorm-repository.js");
const user_event_typeorm_repository_js_1 = require("../persistence/repositories/user-event.typeorm-repository.js");
const event_repository_interface_js_1 = require("../../domain/repositories/event.repository.interface.js");
const user_event_repository_interface_js_1 = require("../../domain/repositories/user-event.repository.interface.js");
const create_event_use_case_js_1 = require("../../application/use-cases/event/create-event.use-case.js");
const find_events_use_case_js_1 = require("../../application/use-cases/event/find-events.use-case.js");
const find_event_by_id_use_case_js_1 = require("../../application/use-cases/event/find-event-by-id.use-case.js");
const get_event_stats_use_case_js_1 = require("../../application/use-cases/event/get-event-stats.use-case.js");
const find_event_with_users_use_case_js_1 = require("../../application/use-cases/event/find-event-with-users.use-case.js");
const update_event_use_case_js_1 = require("../../application/use-cases/event/update-event.use-case.js");
const delete_event_use_case_js_1 = require("../../application/use-cases/event/delete-event.use-case.js");
const associate_user_event_use_case_js_1 = require("../../application/use-cases/event/associate-user-event.use-case.js");
const event_controller_js_1 = require("../../presentation/controllers/event.controller.js");
const user_module_js_1 = require("./user.module.js");
const address_module_js_1 = require("./address.module.js");
let EventModule = class EventModule {
};
exports.EventModule = EventModule;
exports.EventModule = EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([event_typeorm_entity_js_1.EventTypeOrmEntity, user_event_typeorm_entity_js_1.UserEventTypeOrmEntity]),
            (0, common_1.forwardRef)(() => user_module_js_1.UserModule),
            address_module_js_1.AddressModule,
        ],
        controllers: [event_controller_js_1.EventController],
        providers: [
            { provide: event_repository_interface_js_1.EVENT_REPOSITORY, useClass: event_typeorm_repository_js_1.EventTypeOrmRepository },
            { provide: user_event_repository_interface_js_1.USER_EVENT_REPOSITORY, useClass: user_event_typeorm_repository_js_1.UserEventTypeOrmRepository },
            create_event_use_case_js_1.CreateEventUseCase,
            find_events_use_case_js_1.FindEventsUseCase,
            find_event_by_id_use_case_js_1.FindEventByIdUseCase,
            get_event_stats_use_case_js_1.GetEventStatsUseCase,
            find_event_with_users_use_case_js_1.FindEventWithUsersUseCase,
            update_event_use_case_js_1.UpdateEventUseCase,
            delete_event_use_case_js_1.DeleteEventUseCase,
            associate_user_event_use_case_js_1.AssociateUserEventUseCase,
            associate_user_event_use_case_js_1.DissociateUserEventUseCase,
        ],
        exports: [event_repository_interface_js_1.EVENT_REPOSITORY, user_event_repository_interface_js_1.USER_EVENT_REPOSITORY],
    })
], EventModule);
//# sourceMappingURL=event.module.js.map