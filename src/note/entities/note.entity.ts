import { User } from 'src/user/entities/UserEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ length: 120 })
  title: string;
  
  @Column({ length: 500 })
  description: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
}
