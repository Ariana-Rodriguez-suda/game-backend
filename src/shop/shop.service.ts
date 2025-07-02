import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop.entity';
import { Player } from 'src/users/player/player.entity';
import { Repository } from 'typeorm';
import { InventoryItem } from 'src/inventory/inventory.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopItem)
    private itemRepo: Repository<ShopItem>,

    @InjectRepository(Player)
    private playerRepo: Repository<Player>,
  ) {}

  findAll() {
    return this.itemRepo.find();
  }

  create(item: Partial<ShopItem>) {
    return this.itemRepo.save(item);
  }

  async buyItem(playerId: number, itemId: number) {
    const player = await this.playerRepo.findOne({ where: { id: playerId }, relations: ['inventory'] });
    const item = await this.itemRepo.findOne({ where: { id: itemId } });

    if (!player || !item) throw new NotFoundException('Jugador o ítem no encontrado');
    if (player.coins < item.price) throw new BadRequestException('No tienes suficientes monedas');

    player.coins -= item.price;
    player.inventory.push(new InventoryItem);

    await this.playerRepo.save(player);
    return { success: true, coinsLeft: player.coins };
  }
}
