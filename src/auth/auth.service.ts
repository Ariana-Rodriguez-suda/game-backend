import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlayerService } from '../users/player/player.service';
import { TeacherService } from '../users/teacher/teacher.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private playerSvc: PlayerService,
    private teacherSvc: TeacherService,
  ) {}

  async loginPlayer(username: string, password: string) {
    const p = await this.playerSvc.validate(username, password);
    if (!p) throw new BadRequestException('Credenciales inválidas');
    return {
      access_token: this.jwt.sign({ sub: p.id, role: 'player' }),
      user: p,
    };
  }

  async loginTeacher(email: string, password: string) {
    const t = await this.teacherSvc.validate(email, password);
    if (!t) throw new BadRequestException('Credenciales inválidas');
    return {
      access_token: this.jwt.sign({ sub: t.id, role: 'teacher' }),
      user: t,
    };
  }
}
