import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IAddressRepository } from '../../../domain/repositories/address.repository.interface.js';
import { ADDRESS_REPOSITORY } from '../../../domain/repositories/address.repository.interface.js';
import { UpdateAddressDto } from '../../dtos/address/update-address.dto.js';
import { AddressResponseDto } from '../../dtos/address/address-response.dto.js';

interface UpdateAddressInput {
  id: number;
  data: UpdateAddressDto;
}

@Injectable()
export class UpdateAddressUseCase
  implements IUseCase<UpdateAddressInput, AddressResponseDto>
{
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: IAddressRepository,
  ) {}

  async execute(input: UpdateAddressInput): Promise<AddressResponseDto> {
    const existing = await this.addressRepository.findById(input.id);

    if (!existing) {
      throw new NotFoundException(`Address with id ${input.id} not found`);
    }

    const address = await this.addressRepository.update(input.id, input.data);
    return AddressResponseDto.fromDomain(address);
  }
}
