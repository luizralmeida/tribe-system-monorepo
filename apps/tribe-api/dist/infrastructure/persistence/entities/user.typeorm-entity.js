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
exports.UserTypeOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const user_role_enum_js_1 = require("../../../domain/enums/user-role.enum.js");
const user_event_typeorm_entity_js_1 = require("./user-event.typeorm-entity.js");
let UserTypeOrmEntity = class UserTypeOrmEntity {
    id;
    name;
    password;
    phone;
    email;
    role;
    active;
    createdAt;
    updatedAt;
    deletedAt;
    userEvents;
};
exports.UserTypeOrmEntity = UserTypeOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], UserTypeOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], UserTypeOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], UserTypeOrmEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, unique: true }),
    __metadata("design:type", String)
], UserTypeOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], UserTypeOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: user_role_enum_js_1.UserRole }),
    __metadata("design:type", String)
], UserTypeOrmEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], UserTypeOrmEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], UserTypeOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], UserTypeOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], UserTypeOrmEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_event_typeorm_entity_js_1.UserEventTypeOrmEntity, (userEvent) => userEvent.user),
    __metadata("design:type", Array)
], UserTypeOrmEntity.prototype, "userEvents", void 0);
exports.UserTypeOrmEntity = UserTypeOrmEntity = __decorate([
    (0, typeorm_1.Entity)('tb_user')
], UserTypeOrmEntity);
//# sourceMappingURL=user.typeorm-entity.js.map