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
exports.GuestTypeOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const guest_status_enum_js_1 = require("../../../domain/enums/guest-status.enum.js");
const event_typeorm_entity_js_1 = require("./event.typeorm-entity.js");
let GuestTypeOrmEntity = class GuestTypeOrmEntity {
    id;
    name;
    phone;
    status;
    attended;
    eventId;
    email;
    responsibleId;
    isChild;
    age;
    event;
    responsible;
    companions;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.GuestTypeOrmEntity = GuestTypeOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], GuestTypeOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], GuestTypeOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], GuestTypeOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: guest_status_enum_js_1.GuestStatus, default: guest_status_enum_js_1.GuestStatus.NOT_CONFIRMED }),
    __metadata("design:type", String)
], GuestTypeOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], GuestTypeOrmEntity.prototype, "attended", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fk_event', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], GuestTypeOrmEntity.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], GuestTypeOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fk_responsible', type: 'bigint', unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], GuestTypeOrmEntity.prototype, "responsibleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_child', type: 'boolean' }),
    __metadata("design:type", Boolean)
], GuestTypeOrmEntity.prototype, "isChild", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], GuestTypeOrmEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_typeorm_entity_js_1.EventTypeOrmEntity, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'fk_event' }),
    __metadata("design:type", event_typeorm_entity_js_1.EventTypeOrmEntity)
], GuestTypeOrmEntity.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => GuestTypeOrmEntity, (guest) => guest.companions, { eager: false, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'fk_responsible' }),
    __metadata("design:type", GuestTypeOrmEntity)
], GuestTypeOrmEntity.prototype, "responsible", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GuestTypeOrmEntity, (guest) => guest.responsible),
    __metadata("design:type", Array)
], GuestTypeOrmEntity.prototype, "companions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], GuestTypeOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], GuestTypeOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], GuestTypeOrmEntity.prototype, "deletedAt", void 0);
exports.GuestTypeOrmEntity = GuestTypeOrmEntity = __decorate([
    (0, typeorm_1.Entity)('tb_guest')
], GuestTypeOrmEntity);
//# sourceMappingURL=guest.typeorm-entity.js.map