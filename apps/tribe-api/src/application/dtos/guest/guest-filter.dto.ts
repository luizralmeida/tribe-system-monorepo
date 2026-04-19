import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { PaginationWithFilterQueryDto } from '../pagination.dto.js';

export class GuestFilterDto extends PaginationWithFilterQueryDto {
  @IsOptional()
  @IsEnum(GuestStatus)
  status?: GuestStatus;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isChild?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  attended?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  onlyPrimary?: boolean;
}
