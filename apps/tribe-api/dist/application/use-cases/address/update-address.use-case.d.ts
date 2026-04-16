import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IAddressRepository } from '../../../domain/repositories/address.repository.interface.js';
import { UpdateAddressDto } from '../../dtos/address/update-address.dto.js';
import { AddressResponseDto } from '../../dtos/address/address-response.dto.js';
interface UpdateAddressInput {
    id: number;
    data: UpdateAddressDto;
}
export declare class UpdateAddressUseCase implements IUseCase<UpdateAddressInput, AddressResponseDto> {
    private readonly addressRepository;
    constructor(addressRepository: IAddressRepository);
    execute(input: UpdateAddressInput): Promise<AddressResponseDto>;
}
export {};
