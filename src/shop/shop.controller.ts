import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
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
}
