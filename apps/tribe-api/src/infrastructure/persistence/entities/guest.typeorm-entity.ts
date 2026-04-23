import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
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

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ name: 'fk_responsible', type: 'bigint', unsigned: true, nullable: true })
  responsibleId!: number | null;

  @Column({ name: 'is_child', type: 'boolean' })
  isChild!: boolean;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @ManyToOne(() => EventTypeOrmEntity, { eager: false })
  @JoinColumn({ name: 'fk_event' })
  event?: EventTypeOrmEntity;

  @ManyToOne(() => GuestTypeOrmEntity, (guest) => guest.companions, { eager: false, nullable: true })
  @JoinColumn({ name: 'fk_responsible' })
  responsible?: GuestTypeOrmEntity;

  @OneToMany(() => GuestTypeOrmEntity, (guest) => guest.responsible)
  companions?: GuestTypeOrmEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt!: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt!: Date | null;
}
