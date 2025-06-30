import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from './progress.entity';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Player } from 'src/users/player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Progress, Player])],
  providers: [ProgressService],
  controllers: [ProgressController],
  exports: [ProgressService],
})
export class ProgressModule {}
