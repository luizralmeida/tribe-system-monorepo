import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';

export class CreateGuestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone!: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsEnum(GuestStatus)
  status?: GuestStatus;

  @IsBoolean()
  isChild!: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  responsibleId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @Type(() => CreateGuestDto)
  @ValidateNested({ each: true })
  companions?: CreateGuestDto[];
}
