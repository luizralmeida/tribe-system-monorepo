import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  addressId?: number;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  date?: string;
}
