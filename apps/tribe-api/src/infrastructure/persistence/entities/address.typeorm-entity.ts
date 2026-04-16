import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BrazilianState } from '../../../domain/enums/brazilian-state.enum.js';

@Entity('tb_address')
export class AddressTypeOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', length: 255 })
  street!: string;

  @Column({ type: 'varchar', length: 255 })
  neighborhood!: string;

  @Column({ type: 'varchar', length: 10 })
  number!: string;

  @Column({ type: 'varchar', length: 255 })
  complement!: string;

  @Column({ type: 'varchar', length: 255 })
  city!: string;

  @Column({ type: 'enum', enum: BrazilianState })
  state!: BrazilianState;

  @Column({ type: 'varchar', length: 255 })
  country!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt!: Date | null;
}
