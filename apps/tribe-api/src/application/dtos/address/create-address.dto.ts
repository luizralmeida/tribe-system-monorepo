import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { BrazilianState } from '../../../domain/enums/brazilian-state.enum.js';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  street!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  neighborhood!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  number!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  complement?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  city!: string;

  @IsEnum(BrazilianState)
  state!: BrazilianState;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  country?: string;
}
