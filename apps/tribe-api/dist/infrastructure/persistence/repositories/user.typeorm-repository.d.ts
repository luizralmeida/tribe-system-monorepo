import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { User } from '../../../domain/entities/user.entity.js';
import { UserTypeOrmEntity } from '../entities/user.typeorm-entity.js';
export declare class UserTypeOrmRepository implements IUserRepository {
    private readonly ormRepository;
    constructor(ormRepository: Repository<UserTypeOrmEntity>);
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    findAll(options?: {
        page: number;
        limit: number;
    }): Promise<{
        data: User[];
        total: number;
    }>;
    save(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User>;
    update(id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'deletedAt'>>): Promise<User>;
    softDelete(id: number): Promise<void>;
    existsByEmail(email: string): Promise<boolean>;
    existsByPhone(phone: string): Promise<boolean>;
    private toDomain;
}
