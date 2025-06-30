import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from './progress.entity';
import { Player } from 'src/users/player/player.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepo: Repository<Progress>,
  ) {}

  async saveProgress(player: Player, data: Partial<Progress>) {
    const progress = this.progressRepo.create({ ...data, player });
    return this.progressRepo.save(progress);
  }

  async getProgress(playerId: number) {
    return this.progressRepo.find({
      where: { player: { id: playerId } },
      take: 3,
      order: { id: 'DESC' },
    });
  }
  
async getProgressByTeacher(teacherId: number) {
  return this.progressRepo.find({
    relations: ['player', 'player.classRoom', 'level'],
    where: {
      player: {
        classRoom: {
          teacher: { id: teacherId }
        }
      }
    }
  });
}
}
