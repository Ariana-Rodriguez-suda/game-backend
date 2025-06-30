import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from './inventory.entity';
import { ShopItem } from 'src/shop/shop.entity';
import { Player } from 'src/users/player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryItem, ShopItem, Player])],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
