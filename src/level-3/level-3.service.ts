import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level3 } from './level-3.entity';
import { Player } from 'src/users/player/player.entity';

@Injectable()
export class Level3Service {
  constructor(
    @InjectRepository(Level3)
    private level3Repository: Repository<Level3>,
  ) {}

  async saveProgress(playerId: number, score: number, completed: boolean): Promise<Level3> {
    let progress = await this.level3Repository.findOne({ where: { player: { id: playerId } } });

    if (!progress) {
      progress = this.level3Repository.create({
        player: { id: playerId } as Player,
        score,
        completed,
      });
    } else {
      progress.score = score;
      progress.completed = completed;
    }

    return this.level3Repository.save(progress);
  }

  async getProgress(playerId: number): Promise<Level3 | null> {
    return this.level3Repository.findOne({ where: { player: { id: playerId } } });
  }
}
