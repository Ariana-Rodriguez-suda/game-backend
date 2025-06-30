import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('buy')
  buy(@Request() req, @Body('itemId') itemId: number) {
    return this.inventoryService.buyItem(req.user.userId, itemId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getPlayerItems(@Request() req) {
    return this.inventoryService.getPlayerInventory(req.user.userId);
  }
}
