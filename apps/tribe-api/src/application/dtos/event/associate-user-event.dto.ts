import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class AssociateUserEventDto {
  @IsNumber()
  @Type(() => Number)
  userId!: number;
}
