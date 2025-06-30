import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { PlayerService } from './player.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.playerService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  async setAvatar(@Request() req, @Body('itemId') itemId: number) {
    return this.playerService.setActiveAvatar(req.user.userId, itemId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.playerService.getProfile(req.user.userId);
  }
}