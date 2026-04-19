import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';

export class UpdateGuestDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsEnum(GuestStatus)
  status?: GuestStatus;

  @IsOptional()
  @IsBoolean()
  attended?: boolean;

  @IsOptional()
  @IsBoolean()
  isChild?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  responsibleId?: number;
}
