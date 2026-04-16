import { Address } from '../../../domain/entities/address.entity.js';
import { BrazilianState } from '../../../domain/enums/brazilian-state.enum.js';
export declare class AddressResponseDto {
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
    constructor(address: Address);
    static fromDomain(address: Address): AddressResponseDto;
}
