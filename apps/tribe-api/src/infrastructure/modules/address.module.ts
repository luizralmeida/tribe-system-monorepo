import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressTypeOrmEntity } from '../persistence/entities/address.typeorm-entity.js';
import { AddressTypeOrmRepository } from '../persistence/repositories/address.typeorm-repository.js';
import { ADDRESS_REPOSITORY } from '../../domain/repositories/address.repository.interface.js';
import { CreateAddressUseCase } from '../../application/use-cases/address/create-address.use-case.js';
import { UpdateAddressUseCase } from '../../application/use-cases/address/update-address.use-case.js';
import { AddressController } from '../../presentation/controllers/address.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([AddressTypeOrmEntity])],
  controllers: [AddressController],
  providers: [
    { provide: ADDRESS_REPOSITORY, useClass: AddressTypeOrmRepository },
    CreateAddressUseCase,
    UpdateAddressUseCase,
  ],
  exports: [ADDRESS_REPOSITORY],
})
export class AddressModule {}
