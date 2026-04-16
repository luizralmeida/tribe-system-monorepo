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
import { AddressTypeOrmEntity } from './address.typeorm-entity.js';

@Entity('tb_event')
export class EventTypeOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name!: string | null;

  @Column({ name: 'fk_address', type: 'bigint', unsigned: true })
  addressId!: number;

  @Column({ type: 'date' })
  date!: Date;

  @ManyToOne(() => AddressTypeOrmEntity, { eager: false })
  @JoinColumn({ name: 'fk_address' })
  address?: AddressTypeOrmEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt!: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt!: Date | null;
}
