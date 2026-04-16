import { AddressTypeOrmEntity } from './address.typeorm-entity.js';
export declare class EventTypeOrmEntity {
    id: number;
    name: string | null;
    addressId: number;
    date: Date;
    address?: AddressTypeOrmEntity;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
