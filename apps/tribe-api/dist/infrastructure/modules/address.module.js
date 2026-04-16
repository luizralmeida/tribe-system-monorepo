"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const address_typeorm_entity_js_1 = require("../persistence/entities/address.typeorm-entity.js");
const address_typeorm_repository_js_1 = require("../persistence/repositories/address.typeorm-repository.js");
const address_repository_interface_js_1 = require("../../domain/repositories/address.repository.interface.js");
const create_address_use_case_js_1 = require("../../application/use-cases/address/create-address.use-case.js");
const update_address_use_case_js_1 = require("../../application/use-cases/address/update-address.use-case.js");
const address_controller_js_1 = require("../../presentation/controllers/address.controller.js");
let AddressModule = class AddressModule {
};
exports.AddressModule = AddressModule;
exports.AddressModule = AddressModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([address_typeorm_entity_js_1.AddressTypeOrmEntity])],
        controllers: [address_controller_js_1.AddressController],
        providers: [
            { provide: address_repository_interface_js_1.ADDRESS_REPOSITORY, useClass: address_typeorm_repository_js_1.AddressTypeOrmRepository },
            create_address_use_case_js_1.CreateAddressUseCase,
            update_address_use_case_js_1.UpdateAddressUseCase,
        ],
        exports: [address_repository_interface_js_1.ADDRESS_REPOSITORY],
    })
], AddressModule);
//# sourceMappingURL=address.module.js.map