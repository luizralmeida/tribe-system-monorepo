export interface UserEventProps {
  userId: number;
  eventId: number;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class UserEvent {
  readonly userId: number;
  readonly eventId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;

  constructor(props: UserEventProps) {
    this.userId = props.userId;
    this.eventId = props.eventId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt ?? null;
    this.deletedAt = props.deletedAt ?? null;
  }
}
