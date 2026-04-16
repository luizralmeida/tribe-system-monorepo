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
exports.UserEventTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_event_entity_js_1 = require("../../../domain/entities/user-event.entity.js");
const user_event_typeorm_entity_js_1 = require("../entities/user-event.typeorm-entity.js");
let UserEventTypeOrmRepository = class UserEventTypeOrmRepository {
    ormRepository;
    constructor(ormRepository) {
        this.ormRepository = ormRepository;
    }
    async findByUserId(userId) {
        const entities = await this.ormRepository.find({
            where: { userId },
        });
        return entities.map((e) => this.toDomain(e));
    }
    async findByEventId(eventId) {
        const entities = await this.ormRepository.find({
            where: { eventId },
            relations: ['user'],
        });
        return entities.map((e) => this.toDomain(e));
    }
    async exists(userId, eventId) {
        return this.ormRepository.exists({
            where: { userId, eventId },
        });
    }
    async associate(userId, eventId) {
        const entity = this.ormRepository.create({ userId, eventId });
        const saved = await this.ormRepository.save(entity);
        return this.toDomain(saved);
    }
    async dissociate(userId, eventId) {
        await this.ormRepository.delete({ userId, eventId });
    }
    toDomain(entity) {
        return new user_event_entity_js_1.UserEvent({
            userId: Number(entity.userId),
            eventId: Number(entity.eventId),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        });
    }
};
exports.UserEventTypeOrmRepository = UserEventTypeOrmRepository;
exports.UserEventTypeOrmRepository = UserEventTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_event_typeorm_entity_js_1.UserEventTypeOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserEventTypeOrmRepository);
//# sourceMappingURL=user-event.typeorm-repository.js.map