import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level2 } from './level-2.entity';
import { Player } from 'src/users/player/player.entity';

@Injectable()
export class Level2Service {
  constructor(
    @InjectRepository(Level2)
    private level2Repository: Repository<Level2>,
  ) {}

  async saveProgress(playerId: number, score: number, completed: boolean): Promise<Level2> {
    let progress = await this.level2Repository.findOne({ where: { player: { id: playerId } } });

    if (!progress) {
      progress = this.level2Repository.create({
        player: { id: playerId } as Player,
        score,
        completed,
      });
    } else {
      progress.score = score;
      progress.completed = completed;
    }

    return this.level2Repository.save(progress);
  }

  async getProgress(playerId: number): Promise<Level2 | null> {
    return this.level2Repository.findOne({ where: { player: { id: playerId } } });
  }
}
