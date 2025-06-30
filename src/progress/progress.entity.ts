import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Player } from '../users/player/player.entity';
import { Level1 } from 'src/level-1/level-1.entity';
import { Level2 } from 'src/level-2/level-2.entity';
import { Level3 } from 'src/level-3/level-3.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number; // Nivel jugado: 1, 2, 3...

  @Column({ default: 0 })
  stars: number; // Puntuación: 1, 2, 3 estrellas

  @Column({ default: 0 })
  coins: number; // Monedas ganadas en ese intento

  @Column({ default: false })
  completed: boolean; // Si el nivel fue completado

  @ManyToOne(() => Player, player => player.progress, { onDelete: 'CASCADE' })
  player: Player;

  @ManyToOne(() => Level1, level => level.progress)
  level1: Level1;

  @ManyToOne(() => Level2, level => level.progress)
  level2: Level2;

  @ManyToOne(() => Level3, level => level.progress)
  level3: Level3;
}
