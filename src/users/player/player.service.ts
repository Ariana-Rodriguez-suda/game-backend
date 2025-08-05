import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import * as bcrypt from 'bcrypt';
import { InventoryItem } from 'src/inventory/inventory.entity';
import { Class } from 'src/class/class.entity';
import { Progress } from 'src/progress/progress.entity';
import { Avatar } from 'src/avatar/avatar.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepo: Repository<Player>,

    @InjectRepository(InventoryItem)
    private inventoryRepo: Repository<InventoryItem>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,

    @InjectRepository(Progress)
    private progressRepo: Repository<Progress>,

    @InjectRepository(Avatar)
    private avatarRepository: Repository<Avatar>,
  ) {}

  async create(data: Partial<Player>) {
    const exists = await this.playerRepo.findOne({ where: { username: data.username } });
    if (exists) throw new BadRequestException('El usuario ya existe');

    const newPlayer = this.playerRepo.create({
      username: data.username,
      password: data.password,
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

  async setActiveAvatar(playerId: number, avatarId: number) {
    const player = await this.playerRepo.findOne({
      where: { id: playerId },
      relations: ['inventory', 'inventory.item'],
    });

    if (!player) throw new BadRequestException('Jugador no encontrado');

    const ownsAvatar = player.inventory.some(inv => inv.item.id === avatarId);
    if (!ownsAvatar) throw new BadRequestException('No tienes este avatar comprado');

    const avatar = await this.avatarRepository.findOne({ where: { id: avatarId } });
    if (!avatar) throw new BadRequestException('Avatar no encontrado');

    player.activeAvatar = avatar;
    return this.playerRepo.save(player);
  }

  async getAvailableAvatars(playerId: number) {
    return this.avatarRepository.find();
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
            runSpriteUrl: player.activeAvatar.runSpriteUrl,
          }
        : null,
    };
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
