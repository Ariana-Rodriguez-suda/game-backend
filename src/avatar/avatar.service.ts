import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Avatar } from './avatar.entity';
import { Repository } from 'typeorm';
import { Player } from 'src/users/player/player.entity';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,

    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Avatar[]> {
    return this.avatarRepository.find();
  }

  async findOne(id: number): Promise<Avatar> {
    const avatar = await this.avatarRepository.findOneBy({ id });
    if (!avatar) {
      throw new NotFoundException('Avatar no encontrado');
    }
    return avatar;
  }

  async assignAvatarToPlayer(playerId: number, avatarId: number): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: ['avatar'],
    });
    if (!player) throw new NotFoundException('Jugador no encontrado');

    const avatar = await this.avatarRepository.findOneBy({ id: avatarId });
    if (!avatar) throw new NotFoundException('Avatar no encontrado');

    player.avatar = avatar;
    return this.playerRepository.save(player);
  }
  
}
