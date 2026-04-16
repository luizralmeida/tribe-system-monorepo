"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_typeorm_entity_js_1 = require("../persistence/entities/user.typeorm-entity.js");
const user_typeorm_repository_js_1 = require("../persistence/repositories/user.typeorm-repository.js");
const user_repository_interface_js_1 = require("../../domain/repositories/user.repository.interface.js");
const create_user_use_case_js_1 = require("../../application/use-cases/user/create-user.use-case.js");
const find_users_use_case_js_1 = require("../../application/use-cases/user/find-users.use-case.js");
const find_user_by_id_use_case_js_1 = require("../../application/use-cases/user/find-user-by-id.use-case.js");
const update_user_use_case_js_1 = require("../../application/use-cases/user/update-user.use-case.js");
const delete_user_use_case_js_1 = require("../../application/use-cases/user/delete-user.use-case.js");
const user_controller_js_1 = require("../../presentation/controllers/user.controller.js");
const auth_module_js_1 = require("./auth.module.js");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_typeorm_entity_js_1.UserTypeOrmEntity]),
            (0, common_1.forwardRef)(() => auth_module_js_1.AuthModule),
        ],
        controllers: [user_controller_js_1.UserController],
        providers: [
            { provide: user_repository_interface_js_1.USER_REPOSITORY, useClass: user_typeorm_repository_js_1.UserTypeOrmRepository },
            create_user_use_case_js_1.CreateUserUseCase,
            find_users_use_case_js_1.FindUsersUseCase,
            find_user_by_id_use_case_js_1.FindUserByIdUseCase,
            update_user_use_case_js_1.UpdateUserUseCase,
            delete_user_use_case_js_1.DeleteUserUseCase,
        ],
        exports: [user_repository_interface_js_1.USER_REPOSITORY],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map