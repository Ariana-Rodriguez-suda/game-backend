import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ShopItem } from 'src/shop/shop.entity';
import { Player } from 'src/users/player/player.entity';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, player => player.inventory, { onDelete: 'CASCADE' })
  player: Player;

  @ManyToOne(() => ShopItem)
  item: ShopItem;
}
