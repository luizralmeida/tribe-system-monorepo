import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { User } from '../../../domain/entities/user.entity.js';
import { UserTypeOrmEntity } from '../entities/user.typeorm-entity.js';
import { UserFilter } from '../../../application/dtos/user/user-filter.dto.js';
import { UserStats } from '../../../domain/repositories/user.repository.interface.js';
export declare class UserTypeOrmRepository implements IUserRepository {
    private readonly ormRepository;
    constructor(ormRepository: Repository<UserTypeOrmEntity>);
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    findAll(options?: {
        page: number;
        limit: number;
        filter: UserFilter;
    }): Promise<{
        data: User[];
        total: number;
    }>;
    private extractLikeFilter;
    save(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User>;
    update(id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'deletedAt'>>): Promise<User>;
    softDelete(id: number): Promise<void>;
    existsByEmail(email: string): Promise<boolean>;
    existsByPhone(phone: string): Promise<boolean>;
    getStats(): Promise<UserStats>;
    private toDomain;
}
