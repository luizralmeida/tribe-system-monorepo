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
exports.GuestTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const guest_entity_js_1 = require("../../../domain/entities/guest.entity.js");
const guest_status_enum_js_1 = require("../../../domain/enums/guest-status.enum.js");
const guest_typeorm_entity_js_1 = require("../entities/guest.typeorm-entity.js");
let GuestTypeOrmRepository = class GuestTypeOrmRepository {
    ormRepository;
    constructor(ormRepository) {
        this.ormRepository = ormRepository;
    }
    async findById(id) {
        const entity = await this.ormRepository.findOne({ where: { id } });
        return entity ? this.toDomain(entity) : null;
    }
    async findByPhone(phone) {
        const entities = await this.ormRepository.find({
            where: { phone, deletedAt: (0, typeorm_2.IsNull)(), responsibleId: (0, typeorm_2.IsNull)() },
            order: { createdAt: 'DESC' },
        });
        return entities.map((e) => this.toDomain(e));
    }
    async findByEventId(filters) {
        const qb = this.ormRepository
            .createQueryBuilder('guest')
            .loadRelationCountAndMap('guest.companionCount', 'guest.companions')
            .where('guest.fk_event = :eventId AND guest.deleted_at IS NULL', { eventId: filters.eventId });
        this.applyFilters(qb, filters);
        qb.orderBy('guest.name', 'ASC')
            .skip((filters.page - 1) * filters.limit)
            .take(filters.limit);
        const [entities, total] = await qb.getManyAndCount();
        return { data: entities.map((e) => this.toDomain(e)), total };
    }
    async findDependents(responsibleId) {
        const entities = await this.ormRepository.find({
            where: { responsibleId },
        });
        return entities.map((e) => this.toDomain(e));
    }
    async save(guest) {
        const entity = this.ormRepository.create(this.toOrmData(guest));
        const saved = await this.ormRepository.save(entity);
        return this.toDomain(saved);
    }
    async saveBulk(guests) {
        const entities = guests.map((g) => this.ormRepository.create(this.toOrmData(g)));
        const saved = await this.ormRepository.save(entities);
        return saved.map((e) => this.toDomain(e));
    }
    async update(id, data) {
        await this.ormRepository.update(id, data);
        const updated = await this.ormRepository.findOneOrFail({ where: { id } });
        return this.toDomain(updated);
    }
    async softDelete(id) {
        await this.ormRepository.softDelete(id);
    }
    async softDeleteByResponsibleId(responsibleId) {
        await this.ormRepository.softDelete({ responsibleId });
    }
    async updateDependentsContact(responsibleId, data) {
        const updateData = {};
        if (data.email)
            updateData.email = data.email;
        if (data.phone)
            updateData.phone = data.phone;
        if (Object.keys(updateData).length > 0) {
            await this.ormRepository.update({ responsibleId }, updateData);
        }
    }
    async getDashboard(eventId) {
        const qb = this.ormRepository
            .createQueryBuilder('guest')
            .where('guest.fk_event = :eventId', { eventId })
            .andWhere('guest.deleted_at IS NULL');
        const total = await qb.getCount();
        const confirmed = await qb.clone()
            .andWhere('guest.status = :status', { status: guest_status_enum_js_1.GuestStatus.CONFIRMED })
            .getCount();
        const attended = await qb.clone()
            .andWhere('guest.attended = :attended', { attended: true })
            .getCount();
        const nonPayingChildrenCount = await qb.clone()
            .andWhere('guest.is_child = :isChild', { isChild: true })
            .getCount();
        return { total, confirmed, notConfirmed: total - confirmed, attended, nonPayingChildrenCount };
    }
    async findByCompanionId(responsibleId) {
        const entities = await this.ormRepository.find({
            where: {
                responsibleId: Array.isArray(responsibleId)
                    ? (0, typeorm_2.In)(responsibleId)
                    : responsibleId,
                deletedAt: (0, typeorm_2.IsNull)()
            },
        });
        return entities.map((e) => this.toDomain(e));
    }
    applyFilters(qb, filters) {
        if (filters.status) {
            qb.andWhere('guest.status = :status', { status: filters.status });
        }
        if (filters.name) {
            qb.andWhere('guest.name LIKE :name', { name: `%${filters.name}%` });
        }
        if (filters.isChild !== undefined) {
            qb.andWhere('guest.is_child = :isChild', { isChild: filters.isChild });
        }
        if (filters.attended !== undefined) {
            qb.andWhere('guest.attended = :attended', { attended: filters.attended });
        }
        if (filters.onlyPrimary) {
            qb.andWhere('guest.fk_responsible IS NULL');
        }
    }
    toOrmData(guest) {
        return {
            name: guest.name,
            phone: guest.phone,
            status: guest.status,
            attended: guest.attended,
            eventId: guest.eventId,
            email: guest.email,
            responsibleId: guest.responsibleId || null,
            isChild: guest.isChild,
            age: guest.age,
        };
    }
    toDomain(entity) {
        return new guest_entity_js_1.Guest({
            id: Number(entity.id),
            name: entity.name,
            phone: entity.phone,
            status: entity.status,
            attended: entity.attended,
            eventId: Number(entity.eventId),
            email: entity.email,
            responsibleId: entity.responsibleId ? Number(entity.responsibleId) : null,
            isChild: entity.isChild,
            age: entity.age,
            companionCount: entity.companionCount,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        });
    }
};
exports.GuestTypeOrmRepository = GuestTypeOrmRepository;
exports.GuestTypeOrmRepository = GuestTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(guest_typeorm_entity_js_1.GuestTypeOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GuestTypeOrmRepository);
//# sourceMappingURL=guest.typeorm-repository.js.map