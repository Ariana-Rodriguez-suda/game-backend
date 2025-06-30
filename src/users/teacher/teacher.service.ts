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
    const exists = await this.repo.findOne({ where: { email: data.email } });
    if (exists) throw new BadRequestException('Email ya registrado');

    const hashedPassword = await bcrypt.hash(data.password || '', 10);

    const newTeacher = this.repo.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return this.repo.save(newTeacher);
  }

  async validate(email: string, password: string): Promise<Teacher | null> {
    const t = await this.repo.findOne({ where: { email } });
    if (t && await bcrypt.compare(password, t.password)) return t;
    return null;
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
