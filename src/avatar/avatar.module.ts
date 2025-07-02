import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from './avatar.entity';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { Player } from 'src/users/player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avatar, Player])],
  providers: [AvatarService],
  controllers: [AvatarController],
  exports: [AvatarService], 
})
export class AvatarModule {}
