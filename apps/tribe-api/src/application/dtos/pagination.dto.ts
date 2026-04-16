import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 20;
}

export class PaginatedResponseDto<T> {
  readonly data: T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;

  constructor(props: { data: T[]; total: number; page: number; limit: number }) {
    this.data = props.data;
    this.total = props.total;
    this.page = props.page;
    this.limit = props.limit;
    this.totalPages = Math.ceil(props.total / props.limit);
  }
}
