import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Map {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  unlocked: boolean;
}
