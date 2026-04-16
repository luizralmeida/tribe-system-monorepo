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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_js_1 = require("../../infrastructure/auth/decorators/roles.decorator.js");
const user_role_enum_js_1 = require("../../domain/enums/user-role.enum.js");
const create_user_use_case_js_1 = require("../../application/use-cases/user/create-user.use-case.js");
const find_users_use_case_js_1 = require("../../application/use-cases/user/find-users.use-case.js");
const find_user_by_id_use_case_js_1 = require("../../application/use-cases/user/find-user-by-id.use-case.js");
const update_user_use_case_js_1 = require("../../application/use-cases/user/update-user.use-case.js");
const delete_user_use_case_js_1 = require("../../application/use-cases/user/delete-user.use-case.js");
const create_user_dto_js_1 = require("../../application/dtos/user/create-user.dto.js");
const update_user_dto_js_1 = require("../../application/dtos/user/update-user.dto.js");
const pagination_dto_js_1 = require("../../application/dtos/pagination.dto.js");
let UserController = class UserController {
    createUserUseCase;
    findUsersUseCase;
    findUserByIdUseCase;
    updateUserUseCase;
    deleteUserUseCase;
    constructor(createUserUseCase, findUsersUseCase, findUserByIdUseCase, updateUserUseCase, deleteUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.findUsersUseCase = findUsersUseCase;
        this.findUserByIdUseCase = findUserByIdUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async create(dto) {
        return this.createUserUseCase.execute(dto);
    }
    async findAll(query) {
        return this.findUsersUseCase.execute(query);
    }
    async findById(id) {
        return this.findUserByIdUseCase.execute(id);
    }
    async update(id, dto) {
        return this.updateUserUseCase.execute({ id, data: dto });
    }
    async delete(id) {
        return this.deleteUserUseCase.execute(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_js_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_js_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_js_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [create_user_use_case_js_1.CreateUserUseCase,
        find_users_use_case_js_1.FindUsersUseCase,
        find_user_by_id_use_case_js_1.FindUserByIdUseCase,
        update_user_use_case_js_1.UpdateUserUseCase,
        delete_user_use_case_js_1.DeleteUserUseCase])
], UserController);
//# sourceMappingURL=user.controller.js.map