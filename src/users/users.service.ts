import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Class } from 'src/class/class.entity';
import * as bcrypt from 'bcrypt';

interface CreateUserDTO extends Partial<User> {
  classCode?: string; // código enviado desde frontend
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(userData: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(userData.password || '', 10);

    let classRoom: Class | null = null;
    if (userData.classCode) {
      classRoom = await this.classRepository.findOne({ where: { code: userData.classCode } });
      if (!classRoom) {
        throw new BadRequestException('Código de clase inválido');
      }
    }

const userDataToCreate: any = {
  username: userData.username,
  email: userData.email,
  password: hashedPassword,
  role: userData.role,
};

if (classRoom) {
  userDataToCreate.classRoom = classRoom;
}

const newUser = this.usersRepository.create(userDataToCreate); // ← esto debe ser un solo objeto
const savedUser = await this.usersRepository.save(newUser);
console.log('Usuario creado:', savedUser); // debe mostrar un solo objeto
return savedUser;

  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  update(id: number, data: Partial<User>) {
    return this.usersRepository.update(id, data);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }

  async getUserWithClassAndTeacher(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['classRoom', 'classRoom.teacher'],
    });
  }
}
