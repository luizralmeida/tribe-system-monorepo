import { BrazilianState } from '../../../domain/enums/brazilian-state.enum.js';
export declare class AddressTypeOrmEntity {
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
    updatedAt: Date | null;
}
