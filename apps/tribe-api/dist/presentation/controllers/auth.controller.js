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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const login_use_case_js_1 = require("../../application/use-cases/auth/login.use-case.js");
const login_dto_js_1 = require("../../application/dtos/auth/login.dto.js");
const auth_response_dto_js_1 = require("../../application/dtos/auth/auth-response.dto.js");
const public_decorator_js_1 = require("../../infrastructure/auth/decorators/public.decorator.js");
let AuthController = class AuthController {
    loginUseCase;
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    async login(loginDto) {
        return this.loginUseCase.execute(loginDto);
    }
    getProfile(req) {
        return req.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_js_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_js_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", auth_response_dto_js_1.AuthUserDto)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [login_use_case_js_1.LoginUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map