import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private svc: TeacherService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.svc.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    return this.svc.findById(req.user.userid);
  }
}