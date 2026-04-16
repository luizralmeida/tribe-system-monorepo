import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { User } from '../../../domain/entities/user.entity.js';
import { UserTypeOrmEntity } from '../entities/user.typeorm-entity.js';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly ormRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async findById(id: number): Promise<User | null> {
    const entity = await this.ormRepository.findOne({ where: { id } });
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
    options: { page: number; limit: number } = { page: 1, limit: 20 },
  ): Promise<{ data: User[]; total: number }> {
    const [entities, total] = await this.ormRepository.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { createdAt: 'DESC' },
    });

    return { data: entities.map((e) => this.toDomain(e)), total };
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

  private toDomain(entity: UserTypeOrmEntity): User {
    return new User({
      id: Number(entity.id),
      name: entity.name,
      password: entity.password,
      phone: entity.phone,
      email: entity.email,
      role: entity.role,
      active: entity.active,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
