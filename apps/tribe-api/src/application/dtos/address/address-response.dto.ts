import { Address } from '../../../domain/entities/address.entity.js';
import { BrazilianState } from '../../../domain/enums/brazilian-state.enum.js';

export class AddressResponseDto {
  readonly id: number;
  readonly name: string | null;
  readonly street: string;
  readonly neighborhood: string;
  readonly number: string;
  readonly complement: string;
  readonly city: string;
  readonly state: BrazilianState;
  readonly country: string;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;

  constructor(address: Address) {
    this.id = address.id;
    this.name = address.name;
    this.street = address.street;
    this.neighborhood = address.neighborhood;
    this.number = address.number;
    this.complement = address.complement;
    this.city = address.city;
    this.state = address.state;
    this.country = address.country;
    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
  }

  static fromDomain(address: Address): AddressResponseDto {
    return new AddressResponseDto(address);
  }
}
