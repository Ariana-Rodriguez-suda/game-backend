import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param } from '@nestjs/common';
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
  return this.svc.findById(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateProfile(@Request() req, @Body() updateData: any) {
    return this.svc.updateTeacher(updateData, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('classes')
  getMyClasses(@Request() req) {
    return this.svc.getMyClasses(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('classes/:id/students')
  getStudentsByClass(@Param('id') classId: number, @Request() req) {
    // Opcional: puedes validar que la clase pertenezca al maestro autenticado aquí
    return this.svc.getStudentsByClass(classId);
  }
}
