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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressTypeOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const brazilian_state_enum_js_1 = require("../../../domain/enums/brazilian-state.enum.js");
let AddressTypeOrmEntity = class AddressTypeOrmEntity {
    id;
    name;
    street;
    neighborhood;
    number;
    complement;
    city;
    state;
    country;
    createdAt;
    updatedAt;
};
exports.AddressTypeOrmEntity = AddressTypeOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], AddressTypeOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], AddressTypeOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AddressTypeOrmEntity.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AddressTypeOrmEntity.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], AddressTypeOrmEntity.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AddressTypeOrmEntity.prototype, "complement", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AddressTypeOrmEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: brazilian_state_enum_js_1.BrazilianState }),
    __metadata("design:type", String)
], AddressTypeOrmEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AddressTypeOrmEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], AddressTypeOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], AddressTypeOrmEntity.prototype, "updatedAt", void 0);
exports.AddressTypeOrmEntity = AddressTypeOrmEntity = __decorate([
    (0, typeorm_1.Entity)('tb_address')
], AddressTypeOrmEntity);
//# sourceMappingURL=address.typeorm-entity.js.map