import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import * as bcrypt from 'bcrypt';
import { ShopItem } from 'src/shop/shop.entity';
import { InventoryItem } from 'src/inventory/inventory.entity';
import { Class } from 'src/class/class.entity';
import { Progress } from 'src/progress/progress.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepo: Repository<Player>,

    @InjectRepository(ShopItem)
    private shopRepo: Repository<ShopItem>,

    @InjectRepository(InventoryItem)
    private inventoryRepo: Repository<InventoryItem>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,

    @InjectRepository(Progress)
    private progressRepo: Repository<Progress>,
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
            imageUrl: player.activeAvatar.imageUrl,
          }
        : null,
    };
  }

  async getAvailableAvatars(playerId: number) {
    // Retorna los avatares disponibles (en la tienda o comprados)
    // Para simplificar, aquí solo retorno todos los avatares de la tienda
    return this.shopRepo.find();
  }

  async joinClass(playerId: number, code: string) {
    const player = await this.playerRepo.findOne({
      where: { id: playerId },
      relations: ['classRoom'],
    });

    if (!player) throw new NotFoundException('Jugador no encontrado');

    if (player.classRoom) {
      throw new BadRequestException('Ya estás inscrito en una clase');
    }

    const classRoom = await this.classRepo.findOne({ where: { code } });

    if (!classRoom) {
      throw new NotFoundException('Código de clase inválido');
    }

    player.classRoom = classRoom;

    return this.playerRepo.save(player);
  }

  async getProgress(playerId: number) {
    return this.progressRepo.find({
      where: { player: { id: playerId } },
      take: 3,
      order: { id: 'DESC' },
    });
  }

  async updateProfile(playerId: number, data: { username?: string; password?: string }) {
    const player = await this.playerRepo.findOne({ where: { id: playerId } });

    if (!player) throw new NotFoundException('Jugador no encontrado');

    if (data.username) player.username = data.username;
    if (data.password) player.password = await bcrypt.hash(data.password, 10);

    return this.playerRepo.save(player);
  }
}
