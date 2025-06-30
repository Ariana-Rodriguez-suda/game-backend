import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Level3Service } from './level-3.service';

@Controller('level-3')
@UseGuards(JwtAuthGuard)
export class Level3Controller {
  constructor(private readonly level3Service: Level3Service) {}

  @Post()
  async saveProgress(@Request() req, @Body() data: { score: number, completed: boolean }) {
    const playerId = req.user.userId;
    return this.level3Service.saveProgress(playerId, data.score, data.completed);
  }

  @Get()
  async getProgress(@Request() req) {
    const playerId = req.user.userId;
    return this.level3Service.getProgress(playerId);
  }
}
