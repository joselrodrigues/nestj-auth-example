import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './auth.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: Role.USER })
  role: Role;
}
