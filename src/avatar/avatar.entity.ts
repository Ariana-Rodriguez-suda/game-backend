import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Player } from 'src/users/player/player.entity';

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string; // Ruta del sprite o imagen del avatar

  @OneToOne(() => Player, player => player.avatar, { nullable: true })
  player: Player; // El jugador que lo eligió (opcional, si quieres permitir avatares personalizados)
}
