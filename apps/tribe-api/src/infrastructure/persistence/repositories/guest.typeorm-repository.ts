import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  IGuestRepository,
  GuestFilters,
  GuestDashboard,
  CreateGuestData,
  UpdateGuestData,
} from '../../../domain/repositories/guest.repository.interface.js';
import { Guest } from '../../../domain/entities/guest.entity.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { GuestTypeOrmEntity } from '../entities/guest.typeorm-entity.js';

@Injectable()
export class GuestTypeOrmRepository implements IGuestRepository {
  constructor(
    @InjectRepository(GuestTypeOrmEntity)
    private readonly ormRepository: Repository<GuestTypeOrmEntity>,
  ) {}

  async findById(id: number): Promise<Guest | null> {
    const entity = await this.ormRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByPhone(phone: string): Promise<Guest[]> {
    const entities = await this.ormRepository.find({
      where: { phone, deletedAt: undefined },
      order: { createdAt: 'DESC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findByEventId(
    filters: GuestFilters,
  ): Promise<{ data: Guest[]; total: number }> {
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

  async findDependents(responsibleId: number): Promise<Guest[]> {
    const entities = await this.ormRepository.find({
      where: { responsibleId },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async save(guest: CreateGuestData): Promise<Guest> {
    const entity = this.ormRepository.create(this.toOrmData(guest));
    const saved = await this.ormRepository.save(entity);
    return this.toDomain(saved);
  }

  async saveBulk(guests: CreateGuestData[]): Promise<Guest[]> {
    const entities = guests.map((g) => this.ormRepository.create(this.toOrmData(g)));
    const saved = await this.ormRepository.save(entities);
    return saved.map((e) => this.toDomain(e));
  }

  async update(id: number, data: UpdateGuestData): Promise<Guest> {
    await this.ormRepository.update(id, data);
    const updated = await this.ormRepository.findOneOrFail({ where: { id } });
    return this.toDomain(updated);
  }

  async softDelete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async softDeleteByResponsibleId(responsibleId: number): Promise<void> {
    await this.ormRepository.softDelete({ responsibleId });
  }

  async updateDependentsContact(responsibleId: number, data: { email?: string; phone?: string }): Promise<void> {
    const updateData: any = {};
    if (data.email) updateData.email = data.email;
    if (data.phone) updateData.phone = data.phone;
    
    if (Object.keys(updateData).length > 0) {
      await this.ormRepository.update({ responsibleId }, updateData);
    }
  }

  async getDashboard(eventId: number): Promise<GuestDashboard> {
    const qb = this.ormRepository
      .createQueryBuilder('guest')
      .where('guest.fk_event = :eventId', { eventId })
      .andWhere('guest.deleted_at IS NULL');

    const total = await qb.getCount();

    const confirmed = await qb.clone()
      .andWhere('guest.status = :status', { status: GuestStatus.CONFIRMED })
      .getCount();

    const attended = await qb.clone()
      .andWhere('guest.attended = :attended', { attended: true })
      .getCount();

    const nonPayingChildrenCount = await qb.clone()
      .andWhere('guest.is_child = :isChild', { isChild: true })
      .getCount();

    return { total, confirmed, notConfirmed: total - confirmed, attended, nonPayingChildrenCount };
  }

  private applyFilters(
    qb: ReturnType<Repository<GuestTypeOrmEntity>['createQueryBuilder']>,
    filters: GuestFilters,
  ): void {
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

  private toOrmData(guest: CreateGuestData): Partial<GuestTypeOrmEntity> {
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

  private toDomain(entity: GuestTypeOrmEntity): Guest {
    return new Guest({
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
      companionCount: (entity as any).companionCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
