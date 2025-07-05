import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import * as bcrypt from 'bcrypt';
import { ClassesService } from 'src/class/class.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private repo: Repository<Teacher>,

    private classesService: ClassesService,
  ) {}

  async create(data: Partial<Teacher>) {
    if (!data.email) throw new BadRequestException('El email es obligatorio');

    const existsByEmail = await this.repo.findOne({ where: { email: data.email } });
    if (existsByEmail) throw new BadRequestException('Email ya registrado');

    const existsByUsername = await this.repo.findOne({ where: { username: data.username } });
    if (existsByUsername) throw new BadRequestException('Usuario ya registrado');

    const hashedPassword = await bcrypt.hash(data.password || '', 10);

    const newTeacher = this.repo.create({
      username: data.username,
      email: data.email,
      password: hashedPassword, // usa el hash aquí
    });

    return this.repo.save(newTeacher);
  }

  async validate(email: string, password: string): Promise<Teacher | null> {
    const teacher = await this.repo.findOne({ where: { email } });
    if (teacher && await bcrypt.compare(password, teacher.password)) return teacher;
    return null;
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async findByUsernameOrEmail(username: string, email: string) {
    return this.repo.findOne({
      where: [
        { username },
        { email },
      ],
    });
  }

  async findByEmail(email: string): Promise<Teacher | null> {
    return this.repo.findOne({ where: { email } });
  }

  async updateTeacher(data: Partial<Teacher>, teacherId: number) {
    const teacher = await this.repo.findOne({ where: { id: teacherId } });
    if (!teacher) throw new NotFoundException('Maestro no encontrado');

    if (data.username && data.username !== teacher.username) {
      const existsUser = await this.repo.findOne({ where: { username: data.username } });
      if (existsUser) throw new BadRequestException('El usuario ya está en uso');
      teacher.username = data.username;
    }

    if (data.email && data.email !== teacher.email) {
      const existsEmail = await this.repo.findOne({ where: { email: data.email } });
      if (existsEmail) throw new BadRequestException('El correo ya está en uso');
      teacher.email = data.email;
    }

    if (data.password) {
      teacher.password = await bcrypt.hash(data.password, 10);
    }

    return this.repo.save(teacher);
  }

  // Métodos para manejar clases usando el service inyectado

  async getMyClasses(teacherId: number) {
    return this.classesService.findByTeacher(teacherId);
  }

  async getStudentsByClass(classId: number) {
    return this.classesService.getStudentsByClass(classId);
  }
}
