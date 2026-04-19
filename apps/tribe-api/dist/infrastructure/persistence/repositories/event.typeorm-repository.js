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
exports.EventTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_js_1 = require("../../../domain/entities/event.entity.js");
const event_typeorm_entity_js_1 = require("../entities/event.typeorm-entity.js");
const address_entity_js_1 = require("../../../domain/entities/address.entity.js");
const user_event_typeorm_entity_js_1 = require("../entities/user-event.typeorm-entity.js");
let EventTypeOrmRepository = class EventTypeOrmRepository {
    ormRepository;
    userEventRepository;
    constructor(ormRepository, userEventRepository) {
        this.ormRepository = ormRepository;
        this.userEventRepository = userEventRepository;
    }
    async findById(id) {
        const entity = await this.ormRepository.findOne({
            where: { id },
            relations: ['address']
        });
        return entity ? this.toDomain(entity) : null;
    }
    async findAll(options = { page: 1, limit: 20 }) {
        const [entities, total] = await this.ormRepository.findAndCount({
            skip: (options.page - 1) * options.limit,
            take: options.limit,
            order: { date: 'DESC' },
            relations: ['address']
        });
        return { data: entities.map((e) => this.toDomain(e)), total };
    }
    async findByUserId(userId, options = { page: 1, limit: 20 }) {
        const qb = this.ormRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.address', 'address')
            .innerJoin(user_event_typeorm_entity_js_1.UserEventTypeOrmEntity, 'ue', 'ue.fk_event = event.id AND ue.fk_user = :userId', { userId })
            .orderBy('event.date', 'DESC')
            .skip((options.page - 1) * options.limit)
            .take(options.limit);
        const [entities, total] = await qb.getManyAndCount();
        return { data: entities.map((e) => this.toDomain(e)), total };
    }
    async save(event) {
        const entity = this.ormRepository.create({
            name: event.name,
            addressId: event.addressId,
            date: event.date,
        });
        const saved = await this.ormRepository.save(entity);
        return this.toDomain(saved);
    }
    async update(id, data) {
        await this.ormRepository.update(id, data);
        const updated = await this.ormRepository.findOneOrFail({ where: { id } });
        return this.toDomain(updated);
    }
    async softDelete(id) {
        await this.ormRepository.softDelete(id);
    }
    async getStats(userId) {
        const qb = this.ormRepository.createQueryBuilder('event');
        if (userId) {
            qb.innerJoin('user_event', 'ue', 'ue.fk_event = event.id AND ue.fk_user = :userId', { userId });
        }
        const total = await qb.getCount();
        const completedQb = qb.clone().andWhere('event.date < :now', { now: new Date() });
        const futureQb = qb.clone().andWhere('event.date >= :now', { now: new Date() });
        const [completed, future] = await Promise.all([completedQb.getCount(), futureQb.getCount()]);
        return { total, completed, future };
    }
    toDomain(entity) {
        return new event_entity_js_1.Event({
            id: Number(entity.id),
            name: entity.name,
            addressId: Number(entity.addressId),
            date: entity.date,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
            address: entity.address ? new address_entity_js_1.Address({
                id: Number(entity.address.id),
                name: entity.address.name,
                street: entity.address.street,
                neighborhood: entity.address.neighborhood,
                number: entity.address.number,
                complement: entity.address.complement || '',
                city: entity.address.city,
                state: entity.address.state,
                country: entity.address.country,
                createdAt: entity.address.createdAt,
                updatedAt: entity.address.updatedAt,
            }) : undefined,
        });
    }
};
exports.EventTypeOrmRepository = EventTypeOrmRepository;
exports.EventTypeOrmRepository = EventTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_typeorm_entity_js_1.EventTypeOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_event_typeorm_entity_js_1.UserEventTypeOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EventTypeOrmRepository);
//# sourceMappingURL=event.typeorm-repository.js.map