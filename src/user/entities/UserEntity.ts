import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from 'src/note/entities/note.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
