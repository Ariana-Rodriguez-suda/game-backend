import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { LoginPlayerDto } from './dto/login-player.dto';
import { LoginTeacherDto } from './dto/login-teacher.dto';

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
  loginPlayer(@Body() dto: LoginPlayerDto) {
    return this.authService.loginPlayer(dto);
  }

  @Post('teacher/login')
  loginTeacher(@Body() dto: LoginTeacherDto) {
    return this.authService.loginTeacher(dto);
  }
}
