import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Player } from 'src/users/player/player.entity';
import { Progress } from 'src/progress/progress.entity';

@Entity()
export class Level2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  score: number;

  @Column({ default: false })
  completed: boolean;

  @OneToOne(() => Player, { eager: true })
  @JoinColumn()
  player: Player;

  @OneToMany(() => Progress, progress => progress.player)
progress: Progress[];
}
