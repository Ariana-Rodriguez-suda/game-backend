import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ShopItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'avatar' | 'accessory'; // tipo de objeto

  @Column()
  price: number;

  @Column()
  imageUrl: string; // imagen del ítem
}
