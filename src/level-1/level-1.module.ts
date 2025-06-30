import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level1Controller } from './level-1.controller';
import { Level1Service } from './level-1.service';
import { Level1 } from './level-1.entity';
import { Player } from 'src/users/player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level1, Player])],
  controllers: [Level1Controller],
  providers: [Level1Service],
  exports: [TypeOrmModule],
})
export class LevelModule {}
