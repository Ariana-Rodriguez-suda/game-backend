import { Controller, Post, Body, UseGuards, Request, Get, Param, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClassesService } from './class.service';
import { Class } from './class.entity';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body('name') name: string,
    @Body('subject') subject: string,
    @Body('institution') institution: string,
    @Request() req
  ) {
    const teacherId = req.user.id;
    return this.classesService.createClass(name, subject, institution, teacherId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.classesService.findByTeacher(req.user.userid);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/students')
  async getStudents(@Param('id') classId: number) {
    return this.classesService.getStudentsByClass(classId);
  }

  @Get(':id')
getClassById(@Param('id') id: number) {
  return this.classesService.findOneById(id);
}

@Patch(':id')
updateClass(@Param('id') id: number, @Body() updateData: Partial<Class>) {
  return this.classesService.updateClass(id, updateData);
}

@Delete(':id')
deleteClass(@Param('id') id: number) {
  return this.classesService.deleteClass(id);
}
}
