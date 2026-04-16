"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const login_use_case_js_1 = require("../../application/use-cases/auth/login.use-case.js");
const validate_session_use_case_js_1 = require("../../application/use-cases/auth/validate-session.use-case.js");
const bcrypt_hash_service_js_1 = require("../auth/services/bcrypt-hash.service.js");
const jwt_strategy_js_1 = require("../auth/strategies/jwt.strategy.js");
const auth_controller_js_1 = require("../../presentation/controllers/auth.controller.js");
const hash_service_interface_js_1 = require("../../domain/services/hash.service.interface.js");
const user_module_js_1 = require("./user.module.js");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_js_1.UserModule),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
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
        controllers: [auth_controller_js_1.AuthController],
        providers: [
            login_use_case_js_1.LoginUseCase,
            validate_session_use_case_js_1.ValidateSessionUseCase,
            jwt_strategy_js_1.JwtStrategy,
            { provide: hash_service_interface_js_1.HASH_SERVICE, useClass: bcrypt_hash_service_js_1.BcryptHashService },
        ],
        exports: [hash_service_interface_js_1.HASH_SERVICE, validate_session_use_case_js_1.ValidateSessionUseCase],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map