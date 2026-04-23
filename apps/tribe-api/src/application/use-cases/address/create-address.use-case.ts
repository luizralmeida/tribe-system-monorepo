import { Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IAddressRepository } from '../../../domain/repositories/address.repository.interface.js';
import { ADDRESS_REPOSITORY } from '../../../domain/repositories/address.repository.interface.js';
import { CreateAddressDto } from '../../dtos/address/create-address.dto.js';
import { AddressResponseDto } from '../../dtos/address/address-response.dto.js';

@Injectable()
export class CreateAddressUseCase
  implements IUseCase<CreateAddressDto, AddressResponseDto>
{
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: IAddressRepository,
  ) {}

  async execute(input: CreateAddressDto): Promise<AddressResponseDto> {
    const address = await this.addressRepository.save({
      name: input.name ?? null,
      street: input.street,
      neighborhood: input.neighborhood,
      number: input.number,
      complement: input.complement ?? '',
      city: input.city,
      state: input.state,
      country: input.country ?? 'Brasil',
    });

    return AddressResponseDto.fromDomain(address);
  }
}
