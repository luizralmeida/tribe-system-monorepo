import { IsEnum } from 'class-validator';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';

export class UpdateGuestRSVPDto {
  @IsEnum(GuestStatus)
  status!: GuestStatus;
}
