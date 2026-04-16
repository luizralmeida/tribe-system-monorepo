import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
import { UserEvent } from '../../../domain/entities/user-event.entity.js';
import { UserEventTypeOrmEntity } from '../entities/user-event.typeorm-entity.js';

@Injectable()
export class UserEventTypeOrmRepository implements IUserEventRepository {
  constructor(
    @InjectRepository(UserEventTypeOrmEntity)
    private readonly ormRepository: Repository<UserEventTypeOrmEntity>,
  ) {}

  async findByUserId(userId: number): Promise<UserEvent[]> {
    const entities = await this.ormRepository.find({
      where: { userId },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findByEventId(eventId: number): Promise<UserEvent[]> {
    const entities = await this.ormRepository.find({
      where: { eventId },
      relations: ['user'],
    });
    return entities.map((e) => this.toDomain(e));
  }

  async exists(userId: number, eventId: number): Promise<boolean> {
    return this.ormRepository.exists({
      where: { userId, eventId },
    });
  }

  async associate(userId: number, eventId: number): Promise<UserEvent> {
    const entity = this.ormRepository.create({ userId, eventId });
    const saved = await this.ormRepository.save(entity);
    return this.toDomain(saved);
  }

  async dissociate(userId: number, eventId: number): Promise<void> {
    await this.ormRepository.delete({ userId, eventId });
  }

  private toDomain(entity: UserEventTypeOrmEntity): UserEvent {
    return new UserEvent({
      userId: Number(entity.userId),
      eventId: Number(entity.eventId),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
