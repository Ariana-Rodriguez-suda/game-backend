import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level3 } from './level-3.entity';
import { Level3Controller } from './level-3.controller';
import { Level3Service } from './level-3.service';
import { Player } from 'src/users/player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level3, Player])],
  controllers: [Level3Controller],
  providers: [Level3Service],
  exports: [TypeOrmModule],
})
export class Level3Module {}
