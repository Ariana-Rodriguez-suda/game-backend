import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Player } from 'src/users/player/player.entity';

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  runSpriteUrl: string;  // Agrega para el sprite en nivel

  @OneToOne(() => Player, player => player.avatar, { nullable: true })
  player: Player;
}
