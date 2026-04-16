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
    async findByEventId(filters) {
        const qb = this.ormRepository
            .createQueryBuilder('guest')
            .where('guest.fk_event = :eventId', { eventId: filters.eventId });
        this.applyFilters(qb, filters);
        qb.orderBy('guest.created_at', 'DESC')
            .skip((filters.page - 1) * filters.limit)
            .take(filters.limit);
        const [entities, total] = await qb.getManyAndCount();
        return { data: entities.map((e) => this.toDomain(e)), total };
    }
    async findDependents(responsibleId) {
        const entities = await this.ormRepository.find({
            where: { responsibleId, isChild: true },
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
        await this.ormRepository.softDelete({ responsibleId, isChild: true });
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
        return { total, confirmed, notConfirmed: total - confirmed, attended };
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
    }
    toOrmData(guest) {
        return {
            name: guest.name,
            phone: guest.phone,
            status: guest.status,
            attended: guest.attended,
            eventId: guest.eventId,
            email: guest.email,
            responsibleId: guest.responsibleId,
            isChild: guest.isChild,
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
            responsibleId: Number(entity.responsibleId),
            isChild: entity.isChild,
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