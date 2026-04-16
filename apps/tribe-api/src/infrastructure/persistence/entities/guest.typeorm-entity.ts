import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { EventTypeOrmEntity } from './event.typeorm-entity.js';

@Entity('tb_guest')
export class GuestTypeOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ type: 'enum', enum: GuestStatus, default: GuestStatus.NOT_CONFIRMED })
  status!: GuestStatus;

  @Column({ type: 'boolean' })
  attended!: boolean;

  @Column({ name: 'fk_event', type: 'bigint', unsigned: true })
  eventId!: number;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ name: 'fk_responsible', type: 'bigint', unsigned: true })
  responsibleId!: number;

  @Column({ name: 'is_child', type: 'boolean' })
  isChild!: boolean;

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
