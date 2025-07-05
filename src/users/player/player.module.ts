import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { ShopItem } from 'src/shop/shop.entity';
import { InventoryItem } from 'src/inventory/inventory.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Class } from 'src/class/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, ShopItem, InventoryItem, Class])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService, TypeOrmModule],
})
export class PlayerModule {}
