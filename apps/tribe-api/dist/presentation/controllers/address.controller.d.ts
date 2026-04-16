import { CreateAddressUseCase } from '../../application/use-cases/address/create-address.use-case.js';
import { UpdateAddressUseCase } from '../../application/use-cases/address/update-address.use-case.js';
import { CreateAddressDto } from '../../application/dtos/address/create-address.dto.js';
import { UpdateAddressDto } from '../../application/dtos/address/update-address.dto.js';
import { AddressResponseDto } from '../../application/dtos/address/address-response.dto.js';
export declare class AddressController {
    private readonly createAddressUseCase;
    private readonly updateAddressUseCase;
    constructor(createAddressUseCase: CreateAddressUseCase, updateAddressUseCase: UpdateAddressUseCase);
    create(dto: CreateAddressDto): Promise<AddressResponseDto>;
    update(id: number, dto: UpdateAddressDto): Promise<AddressResponseDto>;
}
