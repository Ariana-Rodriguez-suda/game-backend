import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, OneToMany } from 'typeorm';
import { Class } from 'src/class/class.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'estudiante' | 'maestro' | 'jugador';

  @ManyToOne(() => Class, classRoom => classRoom.students, { nullable: true })
  classRoom: Class;

  @OneToMany(() => Class, classRoom => classRoom.teacher)
  classesAsTeacher: Class[];
}

