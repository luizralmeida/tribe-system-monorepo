import { Body, Controller, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Roles } from '../../infrastructure/auth/decorators/roles.decorator.js';
import { UserRole } from '../../domain/enums/user-role.enum.js';
import { CreateAddressUseCase } from '../../application/use-cases/address/create-address.use-case.js';
import { UpdateAddressUseCase } from '../../application/use-cases/address/update-address.use-case.js';
import { CreateAddressDto } from '../../application/dtos/address/create-address.dto.js';
import { UpdateAddressDto } from '../../application/dtos/address/update-address.dto.js';
import { AddressResponseDto } from '../../application/dtos/address/address-response.dto.js';

@Controller('addresses')
export class AddressController {
  constructor(
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly updateAddressUseCase: UpdateAddressUseCase,
  ) {}

  @Post()
  @Roles(UserRole.SUPER)
  async create(@Body() dto: CreateAddressDto): Promise<AddressResponseDto> {
    return this.createAddressUseCase.execute(dto);
  }

  @Put(':id')
  @Roles(UserRole.SUPER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ): Promise<AddressResponseDto> {
    return this.updateAddressUseCase.execute({ id, data: dto });
  }
}
