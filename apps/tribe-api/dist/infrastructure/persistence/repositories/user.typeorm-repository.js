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
exports.UserTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_js_1 = require("../../../domain/entities/user.entity.js");
const user_typeorm_entity_js_1 = require("../entities/user.typeorm-entity.js");
const typeorm_3 = require("typeorm");
const user_role_enum_js_1 = require("../../../domain/enums/user-role.enum.js");
let UserTypeOrmRepository = class UserTypeOrmRepository {
    ormRepository;
    constructor(ormRepository) {
        this.ormRepository = ormRepository;
    }
    async findById(id) {
        const entity = await this.ormRepository.findOne({
            where: { id },
            relations: ['userEvents']
        });
        return entity ? this.toDomain(entity) : null;
    }
    async findByEmail(email) {
        const entity = await this.ormRepository.findOne({ where: { email } });
        return entity ? this.toDomain(entity) : null;
    }
    async findByPhone(phone) {
        const entity = await this.ormRepository.findOne({ where: { phone } });
        return entity ? this.toDomain(entity) : null;
    }
    async findAll(options = { page: 1, limit: 20, filter: {} }) {
        const [entities, total] = await this.ormRepository.findAndCount({
            skip: (options.page - 1) * options.limit,
            take: options.limit,
            order: { createdAt: 'DESC' },
            where: this.extractLikeFilter(options.filter)
        });
        return { data: entities.map((e) => this.toDomain(e)), total };
    }
    extractLikeFilter(filter) {
        const where = {};
        if (filter.name) {
            where.name = (0, typeorm_3.Like)(`%${filter.name}%`);
        }
        if (filter.email) {
            where.email = (0, typeorm_3.Like)(`%${filter.email}%`);
        }
        if (filter.phone) {
            where.phone = (0, typeorm_3.Like)(`%${filter.phone}%`);
        }
        return where;
    }
    async save(user) {
        const entity = this.ormRepository.create(user);
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
    async existsByEmail(email) {
        return this.ormRepository.exists({ where: { email } });
    }
    async existsByPhone(phone) {
        return this.ormRepository.exists({ where: { phone } });
    }
    async getStats() {
        const qb = this.ormRepository.createQueryBuilder('user');
        const total = await qb.getCount();
        const activeQb = qb.clone().andWhere('user.active = :active', { active: true });
        const active = await activeQb.getCount();
        const futureEventsQb = qb.clone()
            .innerJoin('user_event', 'ue', 'ue.fk_user = user.id')
            .innerJoin('event', 'e', 'e.id = ue.fk_event')
            .andWhere('e.date >= :now', { now: new Date() })
            .select('COUNT(DISTINCT user.id)', 'count');
        const futureResult = await futureEventsQb.getRawOne();
        const withFutureEvents = parseInt(futureResult.count, 10) || 0;
        const admin = await qb.clone().andWhere('user.role = :role', { role: user_role_enum_js_1.UserRole.SUPER }).getCount();
        return { total, active, withFutureEvents, admin };
    }
    toDomain(entity) {
        return new user_entity_js_1.User({
            id: Number(entity.id),
            name: entity.name,
            password: entity.password,
            phone: entity.phone,
            email: entity.email,
            role: entity.role,
            active: entity.active,
            eventIds: entity.userEvents?.map((ue) => Number(ue.eventId)),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        });
    }
};
exports.UserTypeOrmRepository = UserTypeOrmRepository;
exports.UserTypeOrmRepository = UserTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_typeorm_entity_js_1.UserTypeOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserTypeOrmRepository);
//# sourceMappingURL=user.typeorm-repository.js.map