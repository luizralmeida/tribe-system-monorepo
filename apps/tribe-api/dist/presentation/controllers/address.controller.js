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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_js_1 = require("../../infrastructure/auth/decorators/roles.decorator.js");
const user_role_enum_js_1 = require("../../domain/enums/user-role.enum.js");
const create_address_use_case_js_1 = require("../../application/use-cases/address/create-address.use-case.js");
const update_address_use_case_js_1 = require("../../application/use-cases/address/update-address.use-case.js");
const create_address_dto_js_1 = require("../../application/dtos/address/create-address.dto.js");
const update_address_dto_js_1 = require("../../application/dtos/address/update-address.dto.js");
let AddressController = class AddressController {
    createAddressUseCase;
    updateAddressUseCase;
    constructor(createAddressUseCase, updateAddressUseCase) {
        this.createAddressUseCase = createAddressUseCase;
        this.updateAddressUseCase = updateAddressUseCase;
    }
    async create(dto) {
        return this.createAddressUseCase.execute(dto);
    }
    async update(id, dto) {
        return this.updateAddressUseCase.execute({ id, data: dto });
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_address_dto_js_1.CreateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_js_1.Roles)(user_role_enum_js_1.UserRole.SUPER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_address_dto_js_1.UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "update", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.Controller)('addresses'),
    __metadata("design:paramtypes", [create_address_use_case_js_1.CreateAddressUseCase,
        update_address_use_case_js_1.UpdateAddressUseCase])
], AddressController);
//# sourceMappingURL=address.controller.js.map