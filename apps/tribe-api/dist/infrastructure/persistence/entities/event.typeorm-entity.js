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
exports.EventTypeOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const address_typeorm_entity_js_1 = require("./address.typeorm-entity.js");
let EventTypeOrmEntity = class EventTypeOrmEntity {
    id;
    name;
    addressId;
    date;
    address;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.EventTypeOrmEntity = EventTypeOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], EventTypeOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], EventTypeOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fk_address', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], EventTypeOrmEntity.prototype, "addressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], EventTypeOrmEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_typeorm_entity_js_1.AddressTypeOrmEntity, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'fk_address' }),
    __metadata("design:type", address_typeorm_entity_js_1.AddressTypeOrmEntity)
], EventTypeOrmEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], EventTypeOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], EventTypeOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], EventTypeOrmEntity.prototype, "deletedAt", void 0);
exports.EventTypeOrmEntity = EventTypeOrmEntity = __decorate([
    (0, typeorm_1.Entity)('tb_event')
], EventTypeOrmEntity);
//# sourceMappingURL=event.typeorm-entity.js.map