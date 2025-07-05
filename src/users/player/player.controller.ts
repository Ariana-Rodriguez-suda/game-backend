import { Controller, Post, Body, Get, Param, UseGuards, Request, Patch } from '@nestjs/common';
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
  @Post('avatar/select')
  async setActiveAvatar(@Request() req, @Body('avatarId') avatarId: number) {
    return this.playerService.setActiveAvatar(req.user.userId, avatarId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.playerService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('avatars')
  async getAvatars(@Request() req) {
    return this.playerService.getAvailableAvatars(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('join-class')
  async joinClass(@Request() req, @Body('code') code: string) {
    return this.playerService.joinClass(req.user.userId, code);
  }

  @UseGuards(JwtAuthGuard)
  @Get('progress')
  async getProgress(@Request() req) {
    return this.playerService.getProgress(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() body: { username?: string; password?: string }) {
    return this.playerService.updateProfile(req.user.userId, body);
  }

  // Si quieres, también podrías agregar un endpoint para comprar items
  // @UseGuards(JwtAuthGuard)
  // @Post('shop/buy')
  // async buyItem(@Request() req, @Body('itemId') itemId: number) {
  //   return this.playerService.buyItem(req.user.userId, itemId);
  // }
}
