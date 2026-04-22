import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { User } from '../../../domain/entities/user.entity.js';
import { UserTypeOrmEntity } from '../entities/user.typeorm-entity.js';
import { UserFilter } from '../../../application/dtos/user/user-filter.dto.js';
import { FindOptionsWhere, Like } from 'typeorm';
import { UserRole } from '../../../domain/enums/user-role.enum.js';
import { UserStats } from '../../../domain/repositories/user.repository.interface.js';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly ormRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async findById(id: number): Promise<User | null> {
    const entity = await this.ormRepository.findOne({ 
      where: { id },
      relations: ['userEvents']
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.ormRepository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const entity = await this.ormRepository.findOne({ where: { phone } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(
    options: { page: number; limit: number; filter: UserFilter } = { page: 1, limit: 20, filter: {} },
  ): Promise<{ data: User[]; total: number }> {
    const [entities, total] = await this.ormRepository.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { createdAt: 'DESC' },
      where: this.extractLikeFilter(options.filter)
    });

    return { data: entities.map((e) => this.toDomain(e)), total };
  }

  private extractLikeFilter(filter: UserFilter): FindOptionsWhere<UserTypeOrmEntity> {
    const where: FindOptionsWhere<UserTypeOrmEntity> = {};

    if (filter.name) {
      where.name = Like(`%${filter.name}%`);
    }

    if (filter.email) {
      where.email = Like(`%${filter.email}%`);
    }

    if (filter.phone) {
      where.phone = Like(`%${filter.phone}%`);
    }

    return where;
  }

  async save(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User> {
    const entity = this.ormRepository.create(user);
    const saved = await this.ormRepository.save(entity);
    return this.toDomain(saved);
  }

  async update(
    id: number,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'deletedAt'>>,
  ): Promise<User> {
    await this.ormRepository.update(id, data);
    const updated = await this.ormRepository.findOneOrFail({ where: { id } });
    return this.toDomain(updated);
  }

  async softDelete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.ormRepository.exists({ where: { email } });
  }

  async existsByPhone(phone: string): Promise<boolean> {
    return this.ormRepository.exists({ where: { phone } });
  }

  async getStats(): Promise<UserStats> {
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
    const admin = await qb.clone().andWhere('user.role = :role', { role: UserRole.SUPER }).getCount();

    return { total, active, withFutureEvents, admin };
  }

  private toDomain(entity: UserTypeOrmEntity): User {
    return new User({
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
}
