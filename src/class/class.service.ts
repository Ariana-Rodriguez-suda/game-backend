import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { Teacher } from '../users/teacher/teacher.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async createClass(name: string, teacher: Teacher): Promise<Class> {
    const code = nanoid(6);
    const newClass = this.classRepository.create({ name, code, teacher });
    return this.classRepository.save(newClass);
  }

  async findByCode(code: string): Promise<Class | null> {
    return this.classRepository.findOne({ where: { code }, relations: ['teacher'] });
  }

  async findByTeacher(teacherId: number): Promise<Class[]> {
    return this.classRepository.find({
      where: { teacher: { id: teacherId } },
      relations: ['teacher'],
    });
  }
}
