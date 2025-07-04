import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import * as bcrypt from 'bcrypt';
import { ShopItem } from 'src/shop/shop.entity';
import { InventoryItem } from 'src/inventory/inventory.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepo: Repository<Player>,

    @InjectRepository(ShopItem)
    private shopRepo: Repository<ShopItem>,

    @InjectRepository(InventoryItem)
    private inventoryRepo: Repository<InventoryItem>,
  ) {}

  async create(data: Partial<Player>) {
    const exists = await this.playerRepo.findOne({ where: { username: data.username } });
    if (exists) throw new BadRequestException('El usuario ya existe');

  const newPlayer = this.playerRepo.create({
    username: data.username,
    password: data.password, // Ya viene hasheada desde auth.service.ts
  });

    return this.playerRepo.save(newPlayer);
  }

  async validate(username: string, password: string): Promise<Player | null> {
    const player = await this.playerRepo.findOne({ where: { username } });
    if (player && await bcrypt.compare(password, player.password)) return player;
    return null;
  }

  findById(id: number) {
    return this.playerRepo.findOne({ where: { id } });
  }

async findPlayerByUsername(username: string) {
  return this.playerRepo.findOne({ where: { username } });
}


  async setActiveAvatar(playerId: number, itemId: number) {
    const player = await this.playerRepo.findOne({
      where: { id: playerId },
      relations: ['inventory', 'inventory.item'],
    });

    if (!player) throw new BadRequestException('Jugador no encontrado');

    const ownsItem = player.inventory.some(inv => inv.item.id === itemId);
    if (!ownsItem) throw new BadRequestException('No has comprado ese avatar');

    const item = await this.shopRepo.findOne({ where: { id: itemId } });
    if (!item) throw new BadRequestException('Avatar no encontrado en la tienda');

    player.activeAvatar = item;

    return this.playerRepo.save(player);
  }

  async getProfile(playerId: number) {
    const player = await this.playerRepo.findOne({
      where: { id: playerId },
      relations: ['activeAvatar'],
    });

    if (!player) throw new BadRequestException('Jugador no encontrado');

    return {
      id: player.id,
      username: player.username,
      coins: player.coins,
      activeAvatar: player.activeAvatar
        ? {
            id: player.activeAvatar.id,
            name: player.activeAvatar.name,
            image: player.activeAvatar.imageUrl,
          }
        : null,
    };
  }
}
