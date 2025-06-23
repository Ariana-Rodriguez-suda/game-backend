import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UserService // añade esto
  ) {}

async register(userData: Partial<User>) {
const user = await this.userService.create(userData);
console.log('Tipo de user:', Array.isArray(user) ? 'es array' : 'es objeto');
console.log('Contenido:', user);

const payload = { sub: user.id, role: user.role };
return {
  access_token: this.jwtService.sign(payload),
  user: {
    id: user.id,
    username: user.username,
    role: user.role,
  },
};
}


async login(email: string, password: string) {
  const user = await this.validateUser(email, password);
  if (!user) throw new Error('Credenciales inválidas');

  const payload = { sub: user.id, role: user.role }; // ← AQUÍ TAMBIÉN
  return {
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  };
}


// auth.service.ts
async validateUser(email: string, password: string): Promise<User | null> {
  const user = await this.usersRepository.findOne({ where: { email } });
  if (user && user.password === password) return user;
  return null;
}
}
