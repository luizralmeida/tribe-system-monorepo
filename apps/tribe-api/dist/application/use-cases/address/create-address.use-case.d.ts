import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IAddressRepository } from '../../../domain/repositories/address.repository.interface.js';
import { CreateAddressDto } from '../../dtos/address/create-address.dto.js';
import { AddressResponseDto } from '../../dtos/address/address-response.dto.js';
export declare class CreateAddressUseCase implements IUseCase<CreateAddressDto, AddressResponseDto> {
    private readonly addressRepository;
    constructor(addressRepository: IAddressRepository);
    execute(input: CreateAddressDto): Promise<AddressResponseDto>;
}
