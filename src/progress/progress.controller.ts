import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async save(@Request() req, @Body() body) {
    return this.progressService.saveProgress(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Request() req) {
    return this.progressService.getProgress(req.user.userId);
  }
  
  @UseGuards(JwtAuthGuard)
@Get('teacher')
async getProgressForTeacher(@Request() req) {
  return this.progressService.getProgressByTeacher(req.user.userId);
}
}
