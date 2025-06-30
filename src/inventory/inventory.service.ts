import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryItem } from './inventory.entity';
import { Repository } from 'typeorm';
import { Player } from 'src/users/player/player.entity';
import { ShopItem } from 'src/shop/shop.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private inventoryRepo: Repository<InventoryItem>,
    @InjectRepository(Player)
    private playerRepo: Repository<Player>,
    @InjectRepository(ShopItem)
    private shopRepo: Repository<ShopItem>,
  ) {}

  async buyItem(playerId: number, itemId: number) {
    const player = await this.playerRepo.findOne({ where: { id: playerId } });
    const item = await this.shopRepo.findOne({ where: { id: itemId } });

    if (!player || !item) throw new BadRequestException('Datos inválidos');

    if (player.coins < item.price) throw new BadRequestException('Monedas insuficientes');

    const alreadyOwned = await this.inventoryRepo.findOne({
      where: { player: { id: playerId }, item: { id: itemId } },
    });

    if (alreadyOwned) throw new BadRequestException('Ya comprado');

    player.coins -= item.price;
    await this.playerRepo.save(player);

    const inventoryItem = this.inventoryRepo.create({ player, item });
    return this.inventoryRepo.save(inventoryItem);
  }

  async getPlayerInventory(playerId: number) {
    return this.inventoryRepo.find({
      where: { player: { id: playerId } },
      relations: ['item'],
    });
  }
}
