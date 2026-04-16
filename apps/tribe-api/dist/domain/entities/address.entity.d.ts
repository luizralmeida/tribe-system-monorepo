import { BaseEntity } from './entity.base.js';
import { BrazilianState } from '../enums/brazilian-state.enum.js';
export interface AddressProps {
    id: number;
    name: string | null;
    street: string;
    neighborhood: string;
    number: string;
    complement: string;
    city: string;
    state: BrazilianState;
    country: string;
    createdAt: Date;
    updatedAt?: Date | null;
}
export declare class Address extends BaseEntity {
    readonly name: string | null;
    readonly street: string;
    readonly neighborhood: string;
    readonly number: string;
    readonly complement: string;
    readonly city: string;
    readonly state: BrazilianState;
    readonly country: string;
    constructor(props: AddressProps);
}
