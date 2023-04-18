import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Patients {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'first_name',
    nullable: false,
    default: '',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    nullable: false,
    default: '',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  gender: string;

  @Column({
    type: 'text',
    nullable: false,
    default: '',
  })
  comment: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
