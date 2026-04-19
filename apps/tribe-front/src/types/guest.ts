import { GuestStatus } from './enums';

export interface Guest {
  id: number;
  name: string;
  phone: string;
  status: GuestStatus;
  attended: boolean;
  eventId: number;
  email: string;
  responsibleId: number;
  isChild: boolean;
  companionCount: number;
  age?: number;
  createdAt: string;
  updatedAt: string | null;
}
