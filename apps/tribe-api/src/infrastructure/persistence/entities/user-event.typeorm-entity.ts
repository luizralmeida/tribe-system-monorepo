import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserTypeOrmEntity } from './user.typeorm-entity.js';
import { EventTypeOrmEntity } from './event.typeorm-entity.js';

@Entity('user_event')
export class UserEventTypeOrmEntity {
  @PrimaryColumn({ name: 'fk_user', type: 'bigint', unsigned: true })
  userId!: number;

  @PrimaryColumn({ name: 'fk_event', type: 'bigint', unsigned: true })
  eventId!: number;

  @ManyToOne(() => UserTypeOrmEntity, { eager: false })
  @JoinColumn({ name: 'fk_user' })
  user?: UserTypeOrmEntity;

  @ManyToOne(() => EventTypeOrmEntity, { eager: false })
  @JoinColumn({ name: 'fk_event' })
  event?: EventTypeOrmEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt!: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt!: Date | null;
}
