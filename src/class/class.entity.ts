import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string; 

  @ManyToOne(() => User, user => user.classesAsTeacher)
  teacher: User;

  @OneToMany(() => User, user => user.classRoom)
  students: User[];
}
