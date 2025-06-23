import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClassesService } from './class.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body('name') name: string, @Request() req) {
    // Aquí usamos req.user.userId porque es como lo devuelve jwt.strategy.ts
    return this.classesService.createClass(name, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.classesService.findByTeacher(req.user.userId);
  }
}
