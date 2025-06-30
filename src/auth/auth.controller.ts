import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private a: AuthService) {}

  @Post('login/player')
  loginPlayer(@Body() b: any) {
    return this.a.loginPlayer(b.username, b.password);
  }

  @Post('login/teacher')
  loginTeacher(@Body() b: any) {
    return this.a.loginTeacher(b.email, b.password);
  }
}
