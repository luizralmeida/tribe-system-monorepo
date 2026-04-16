import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IEventRepository, CreateEventData, UpdateEventData } from '../../../domain/repositories/event.repository.interface.js';
import { Event } from '../../../domain/entities/event.entity.js';
import { EventTypeOrmEntity } from '../entities/event.typeorm-entity.js';
import { UserEventTypeOrmEntity } from '../entities/user-event.typeorm-entity.js';

@Injectable()
export class EventTypeOrmRepository implements IEventRepository {
  constructor(
    @InjectRepository(EventTypeOrmEntity)
    private readonly ormRepository: Repository<EventTypeOrmEntity>,
    @InjectRepository(UserEventTypeOrmEntity)
    private readonly userEventRepository: Repository<UserEventTypeOrmEntity>,
  ) {}

  async findById(id: number): Promise<Event | null> {
    const entity = await this.ormRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(
    options: { page: number; limit: number } = { page: 1, limit: 20 },
  ): Promise<{ data: Event[]; total: number }> {
    const [entities, total] = await this.ormRepository.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { date: 'DESC' },
    });
    return { data: entities.map((e) => this.toDomain(e)), total };
  }

  async findByUserId(
    userId: number,
    options: { page: number; limit: number } = { page: 1, limit: 20 },
  ): Promise<{ data: Event[]; total: number }> {
    const qb = this.ormRepository
      .createQueryBuilder('event')
      .innerJoin(
        UserEventTypeOrmEntity,
        'ue',
        'ue.fk_event = event.id AND ue.fk_user = :userId',
        { userId },
      )
      .orderBy('event.date', 'DESC')
      .skip((options.page - 1) * options.limit)
      .take(options.limit);

    const [entities, total] = await qb.getManyAndCount();
    return { data: entities.map((e) => this.toDomain(e)), total };
  }

  async save(event: CreateEventData): Promise<Event> {
    const entity = this.ormRepository.create({
      name: event.name,
      addressId: event.addressId,
      date: event.date,
    });
    const saved = await this.ormRepository.save(entity);
    return this.toDomain(saved);
  }

  async update(id: number, data: UpdateEventData): Promise<Event> {
    await this.ormRepository.update(id, data);
    const updated = await this.ormRepository.findOneOrFail({ where: { id } });
    return this.toDomain(updated);
  }

  async softDelete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async getStats(userId?: number): Promise<{ total: number; completed: number; future: number }> {
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

  private toDomain(entity: EventTypeOrmEntity): Event {
    return new Event({
      id: Number(entity.id),
      name: entity.name,
      addressId: Number(entity.addressId),
      date: entity.date,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
