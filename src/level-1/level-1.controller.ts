import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Level1Service } from './level-1.service';

@Controller('level-1')
@UseGuards(JwtAuthGuard)
export class Level1Controller {
  constructor(private readonly level1Service: Level1Service) {}

  @Post()
  async saveProgress(@Request() req, @Body() data: { score: number, completed: boolean }) {
    const playerId = req.user.userId;
    return this.level1Service.saveProgress(playerId, data.score, data.completed);
  }

  @Get()
  async getProgress(@Request() req) {
    const playerId = req.user.userId;
    return this.level1Service.getProgress(playerId);
  }
}
