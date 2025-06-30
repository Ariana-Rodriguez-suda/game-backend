import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level1 } from './level-1.entity';
import { Player } from 'src/users/player/player.entity';

@Injectable()
export class Level1Service {
  constructor(
    @InjectRepository(Level1)
    private level1Repository: Repository<Level1>,
  ) {}

  async saveProgress(playerId: number, score: number, completed: boolean): Promise<Level1> {
    let progress = await this.level1Repository.findOne({ where: { player: { id: playerId } } });

    if (!progress) {
      progress = this.level1Repository.create({
        player: { id: playerId } as Player,
        score,
        completed,
      });
    } else {
      progress.score = score;
      progress.completed = completed;
    }

    return this.level1Repository.save(progress);
  }

  async getProgress(playerId: number): Promise<Level1 | null> {
    return this.level1Repository.findOne({ where: { player: { id: playerId } } });
  }
}
