import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PlayerService } from 'src/users/player/player.service';
import { TeacherService } from 'src/users/teacher/teacher.service';
import { Player } from 'src/users/player/player.entity';

@Injectable()
export class AuthService {
  constructor(
    private playerService: PlayerService,
    private teacherService: TeacherService,
    private jwtService: JwtService,
  ) {}

  async registerPlayer(dto: { username: string; password: string }) {
    // Verificar si jugador existe
    const exists = await this.playerService.findByUsername(dto.username);
    if (exists) throw new ConflictException('Jugador ya existe');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const player = await this.playerService.create({
      username: dto.username,
      password: hashedPassword,
    });

    const payload = { sub: player.id, username: player.username, role: 'player' };
    const token = this.jwtService.sign(payload);

    return { access_token: token, user: player };
  }

  async registerTeacher(dto: { username: string; email: string; password: string }) {
    // Verificar si maestro existe
    const exists = await this.teacherService.findByUsernameOrEmail(dto.username, dto.email);
    if (exists) throw new ConflictException('Maestro ya existe');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const teacher = await this.teacherService.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });

    const payload = { sub: teacher.id, username: teacher.username, role: 'teacher' };
    const token = this.jwtService.sign(payload);

    return { access_token: token, user: teacher };
  }

async validateTeacher(email: string, password: string) {
    const teacher = await this.teacherService.findByEmail(email);
    if (!teacher) throw new UnauthorizedException('Correo no registrado');

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    return teacher;
  }

  // Generar token para maestro
  loginTeacher(teacher: any) {
    const payload = { sub: teacher.id, username: teacher.username, role: 'teacher' };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: teacher.id,
        username: teacher.username,
        email: teacher.email,
      },
    };
  }

  // Ya debes tener algo similar para jugador:
  async validatePlayer(username: string, password: string) {
    const player = await this.playerService.findByUsername(username);
    if (!player) throw new UnauthorizedException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    return player;
  }

  loginPlayer(player: any) {
    const payload = { sub: player.id, username: player.username, role: 'player' };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: player.id,
        username: player.username,
      },
    };
  }
}