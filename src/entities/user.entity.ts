import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    type: 'text',
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    type: 'text',
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
    default: '',
  })
  password: string;
}
