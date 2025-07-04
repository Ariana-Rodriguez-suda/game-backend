import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private repo: Repository<Teacher>,
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
  password: data.password, // ya viene hasheado
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
}
