import { IsArray, IsOptional, IsNumber } from 'class-validator';

export class CheckInGuestDto {
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  companionIds?: number[];
}
