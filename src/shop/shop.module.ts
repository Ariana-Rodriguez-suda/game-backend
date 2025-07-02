import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopItem } from './shop.entity';
import { Player } from 'src/users/player/player.entity';
import { PlayerModule } from 'src/users/player/player.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopItem, Player]), 
    PlayerModule, 
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
