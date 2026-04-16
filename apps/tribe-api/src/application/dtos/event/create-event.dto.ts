import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsNumber()
  @Type(() => Number)
  addressId!: number;

  @IsDateString()
  @IsNotEmpty()
  date!: string;
}
