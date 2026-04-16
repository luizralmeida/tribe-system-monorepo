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
exports.UserEventTypeOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const user_typeorm_entity_js_1 = require("./user.typeorm-entity.js");
const event_typeorm_entity_js_1 = require("./event.typeorm-entity.js");
let UserEventTypeOrmEntity = class UserEventTypeOrmEntity {
    userId;
    eventId;
    user;
    event;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.UserEventTypeOrmEntity = UserEventTypeOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'fk_user', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], UserEventTypeOrmEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'fk_event', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], UserEventTypeOrmEntity.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_typeorm_entity_js_1.UserTypeOrmEntity, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'fk_user' }),
    __metadata("design:type", user_typeorm_entity_js_1.UserTypeOrmEntity)
], UserEventTypeOrmEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_typeorm_entity_js_1.EventTypeOrmEntity, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'fk_event' }),
    __metadata("design:type", event_typeorm_entity_js_1.EventTypeOrmEntity)
], UserEventTypeOrmEntity.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], UserEventTypeOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], UserEventTypeOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], UserEventTypeOrmEntity.prototype, "deletedAt", void 0);
exports.UserEventTypeOrmEntity = UserEventTypeOrmEntity = __decorate([
    (0, typeorm_1.Entity)('tb_user_event')
], UserEventTypeOrmEntity);
//# sourceMappingURL=user-event.typeorm-entity.js.map