import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Level2Service } from './level-2.service';

@Controller('level-2')
@UseGuards(JwtAuthGuard)
export class Level2Controller {
  constructor(private readonly level2Service: Level2Service) {}

  @Post()
  async saveProgress(@Request() req, @Body() data: { score: number, completed: boolean }) {
    const playerId = req.user.userId;
    return this.level2Service.saveProgress(playerId, data.score, data.completed);
  }

  @Get()
  async getProgress(@Request() req) {
    const playerId = req.user.userId;
    return this.level2Service.getProgress(playerId);
  }
}
