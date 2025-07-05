import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { Teacher } from '../users/teacher/teacher.entity';
import { Player } from '../users/player/player.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async createClass(name: string, subject: string, institution: string, teacherId: number): Promise<Class> {
    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
    if (!teacher) throw new NotFoundException('Maestro no encontrado');

    const code = nanoid(6);
    const newClass = this.classRepository.create({ name, code, subject, institution, teacher });
    return this.classRepository.save(newClass);
  }

  async findByTeacher(teacherId: number): Promise<Class[]> {
    return this.classRepository.find({
      where: { teacher: { id: teacherId } },
      relations: ['students'],
    });
  }

  async getStudentsByClass(classId: number): Promise<Player[]> {
    const classData = await this.classRepository.findOne({
      where: { id: classId },
      relations: ['students'],
    });

    if (!classData) throw new NotFoundException('Clase no encontrada');

    return classData.students;
  }

  async findOneById(classId: number): Promise<Class> {
  const classData = await this.classRepository.findOne({
    where: { id: classId },
    relations: ['teacher'],
  });

  if (!classData) throw new NotFoundException('Clase no encontrada');
  return classData;
}

async updateClass(classId: number, updateData: Partial<Class>): Promise<Class> {
  const clase = await this.classRepository.findOne({ where: { id: classId } });
  if (!clase) throw new NotFoundException('Clase no encontrada');

  Object.assign(clase, updateData);
  return this.classRepository.save(clase);
}

async deleteClass(classId: number): Promise<void> {
  const clase = await this.classRepository.findOne({ where: { id: classId } });
  if (!clase) throw new NotFoundException('Clase no encontrada');
  await this.classRepository.remove(clase);
}

}
