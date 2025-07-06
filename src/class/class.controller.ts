import { Controller, Post, Body, UseGuards, Request, Get, Param, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClassesService } from './class.service';
import { Class } from './class.entity';
import { CreateClassDto } from './create-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

@UseGuards(JwtAuthGuard)
@Post()
async create(@Body() body: CreateClassDto, @Request() req) {
  const teacherId = req.user.id;
  return this.classesService.createClass(body.name, body.subject, body.institution, teacherId);
}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.classesService.findByTeacher(req.user.userId);
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
