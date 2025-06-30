import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { LoginPlayerDto } from './dto/login-player.dto';
import { LoginTeacherDto } from './dto/login-teacher.dto';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('player/register')
  registerPlayer(@Body() dto: RegisterPlayerDto) {
    return this.authService.registerPlayer(dto);
  }

  @Post('teacher/register')
  registerTeacher(@Body() dto: RegisterTeacherDto) {
    return this.authService.registerTeacher(dto);
  }

@Post('player/login')
async loginPlayer(@Body() body: LoginPlayerDto) {
  const player = await this.authService.validatePlayer(body.username, body.password);
  if (!player) throw new UnauthorizedException('Credenciales inválidas');

  return this.authService.loginPlayer(player);
}

@Post('teacher/login')
async loginTeacher(@Body() body: LoginTeacherDto) {
  const teacher = await this.authService.validateTeacher(body.email, body.password);
  if (!teacher) throw new UnauthorizedException('Credenciales inválidas');

  return this.authService.loginTeacher(teacher);
}
}
