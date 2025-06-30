import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopItem])],
  providers: [ShopService],
  controllers: [ShopController],
  exports: [ShopService, TypeOrmModule],
})
export class ShopModule {}
