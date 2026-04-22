import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../pagination.dto.js';

export class FindEventsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;
}
