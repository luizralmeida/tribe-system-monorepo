import { CreateAddressDto } from '../address/create-address.dto.js';
export declare class CreateEventDto {
    name?: string;
    addressId?: number;
    address?: CreateAddressDto;
    date: string;
}
