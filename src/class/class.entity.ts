import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Teacher } from '../users/teacher/teacher.entity';
import { Player } from '../users/player/player.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
subject: string;

@Column()
institution: string;


  @ManyToOne(() => Teacher, teacher => teacher.classes)
  teacher: Teacher;

  @OneToMany(() => Player, player => player.classRoom)
  students: Player[];
}
