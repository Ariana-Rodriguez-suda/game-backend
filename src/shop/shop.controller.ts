import { Controller, Get, Post, Body, Param, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { ShopService } from './shop.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  getItems() {
    return this.shopService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() itemData) {
    return this.shopService.create(itemData);
  }

  @Post(':playerId/buy')
  async buyItem(
    @Param('playerId') playerId: number,
    @Body() { itemId }: { itemId: number },
  ) {
    return this.shopService.buyItem(playerId, itemId);
  }
}
