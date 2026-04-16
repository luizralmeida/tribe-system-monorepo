import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IAddressRepository, CreateAddressData, UpdateAddressData } from '../../../domain/repositories/address.repository.interface.js';
import { Address } from '../../../domain/entities/address.entity.js';
import { AddressTypeOrmEntity } from '../entities/address.typeorm-entity.js';

@Injectable()
export class AddressTypeOrmRepository implements IAddressRepository {
  constructor(
    @InjectRepository(AddressTypeOrmEntity)
    private readonly ormRepository: Repository<AddressTypeOrmEntity>,
  ) {}

  async findById(id: number): Promise<Address | null> {
    const entity = await this.ormRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async save(address: CreateAddressData): Promise<Address> {
    const entity = this.ormRepository.create({
      name: address.name,
      street: address.street,
      neighborhood: address.neighborhood,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      country: address.country,
    });
    const saved = await this.ormRepository.save(entity);
    return this.toDomain(saved);
  }

  async update(id: number, data: UpdateAddressData): Promise<Address> {
    const updatePayload: Partial<AddressTypeOrmEntity> = {};
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.street !== undefined) updatePayload.street = data.street;
    if (data.neighborhood !== undefined) updatePayload.neighborhood = data.neighborhood;
    if (data.number !== undefined) updatePayload.number = data.number;
    if (data.complement !== undefined) updatePayload.complement = data.complement;
    if (data.city !== undefined) updatePayload.city = data.city;
    if (data.state !== undefined) updatePayload.state = data.state;
    if (data.country !== undefined) updatePayload.country = data.country;

    await this.ormRepository.update(id, updatePayload);
    const updated = await this.ormRepository.findOneOrFail({ where: { id } });
    return this.toDomain(updated);
  }

  private toDomain(entity: AddressTypeOrmEntity): Address {
    return new Address({
      id: Number(entity.id),
      name: entity.name,
      street: entity.street,
      neighborhood: entity.neighborhood,
      number: entity.number,
      complement: entity.complement,
      city: entity.city,
      state: entity.state,
      country: entity.country,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
