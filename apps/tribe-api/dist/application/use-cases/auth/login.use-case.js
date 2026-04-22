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
var LoginUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_repository_interface_js_1 = require("../../../domain/repositories/user.repository.interface.js");
const hash_service_interface_js_1 = require("../../../domain/services/hash.service.interface.js");
const auth_response_dto_js_1 = require("../../dtos/auth/auth-response.dto.js");
const common_2 = require("@nestjs/common");
const user_role_enum_js_1 = require("src/domain/enums/user-role.enum.js");
let LoginUseCase = LoginUseCase_1 = class LoginUseCase {
    userRepository;
    hashService;
    jwtService;
    constructor(userRepository, hashService, jwtService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.jwtService = jwtService;
    }
    logger = new common_2.Logger(LoginUseCase_1.name);
    async execute(input) {
        this.logger.debug(`[execute] Login attempt for user: ${input.email}`);
        const rootLogin = await this.handleRootLogin(input);
        if (rootLogin != null) {
            return rootLogin;
        }
        const user = await this.userRepository.findByEmail(input.email);
        if (!user || !user.active) {
            this.logger.error(`[execute] User not found or inactive: ${input.email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await this.hashService.compare(input.password, user.password);
        if (!isPasswordValid) {
            this.logger.error(`[execute] Invalid password for user: ${input.email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        this.logger.debug(`[execute] User logged in successfully: ${input.email}`);
        return new auth_response_dto_js_1.AuthResponseDto({
            accessToken,
            user: new auth_response_dto_js_1.AuthUserDto({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }),
        });
    }
    async handleRootLogin(input) {
        if (input.email === process.env.ROOT_USER && input.password === process.env.ROOT_PASSWORD) {
            const payload = { sub: 0, email: input.email, role: user_role_enum_js_1.UserRole.SUPER };
            const accessToken = this.jwtService.sign(payload);
            return new auth_response_dto_js_1.AuthResponseDto({
                accessToken,
                user: new auth_response_dto_js_1.AuthUserDto({
                    id: 0,
                    name: 'Root',
                    email: input.email,
                    role: user_role_enum_js_1.UserRole.SUPER,
                }),
            });
        }
        return null;
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = LoginUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_repository_interface_js_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(hash_service_interface_js_1.HASH_SERVICE)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService])
], LoginUseCase);
//# sourceMappingURL=login.use-case.js.map