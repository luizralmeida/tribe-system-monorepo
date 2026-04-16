"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const env_validation_js_1 = require("../../config/env.validation.js");
const http_exception_filter_js_1 = require("../filters/http-exception.filter.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const auth_module_js_1 = require("./auth.module.js");
const user_module_js_1 = require("./user.module.js");
const address_module_js_1 = require("./address.module.js");
const event_module_js_1 = require("./event.module.js");
const guest_module_js_1 = require("./guest.module.js");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: env_validation_js_1.validateEnv,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.getOrThrow('DB_HOST'),
                    port: configService.getOrThrow('DB_PORT'),
                    username: configService.getOrThrow('DB_USERNAME'),
                    password: configService.getOrThrow('DB_PASSWORD'),
                    database: configService.getOrThrow('DB_DATABASE'),
                    autoLoadEntities: true,
                    synchronize: true,
                    logging: false,
                }),
            }),
            auth_module_js_1.AuthModule,
            user_module_js_1.UserModule,
            address_module_js_1.AddressModule,
            event_module_js_1.EventModule,
            guest_module_js_1.GuestModule,
        ],
        providers: [
            { provide: core_1.APP_FILTER, useClass: http_exception_filter_js_1.GlobalExceptionFilter },
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_js_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_js_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map