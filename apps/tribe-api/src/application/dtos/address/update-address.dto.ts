import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { BrazilianState } from '../../../domain/enums/brazilian-state.enum.js';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  street?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  neighborhood?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  number?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  complement?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  city?: string;

  @IsOptional()
  @IsEnum(BrazilianState)
  state?: BrazilianState;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  country?: string;
}
