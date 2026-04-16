import { Repository } from 'typeorm';
import type { IAddressRepository, CreateAddressData, UpdateAddressData } from '../../../domain/repositories/address.repository.interface.js';
import { Address } from '../../../domain/entities/address.entity.js';
import { AddressTypeOrmEntity } from '../entities/address.typeorm-entity.js';
export declare class AddressTypeOrmRepository implements IAddressRepository {
    private readonly ormRepository;
    constructor(ormRepository: Repository<AddressTypeOrmEntity>);
    findById(id: number): Promise<Address | null>;
    save(address: CreateAddressData): Promise<Address>;
    update(id: number, data: UpdateAddressData): Promise<Address>;
    private toDomain;
}
