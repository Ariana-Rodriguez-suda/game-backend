import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level2Service } from './level-2.service';
import { Level2Controller } from './level-2.controller';
import { Level2 } from './level-2.entity';
import { Player } from 'src/users/player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level2, Player])],
  providers: [Level2Service],
  controllers: [Level2Controller],
  exports: [TypeOrmModule],
})
export class Level2Module {}
