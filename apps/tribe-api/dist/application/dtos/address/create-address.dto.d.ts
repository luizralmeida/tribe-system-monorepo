import { BrazilianState } from '../../../domain/enums/brazilian-state.enum.js';
export declare class CreateAddressDto {
    name?: string;
    street: string;
    neighborhood: string;
    number: string;
    complement?: string;
    city: string;
    state: BrazilianState;
    country?: string;
}
