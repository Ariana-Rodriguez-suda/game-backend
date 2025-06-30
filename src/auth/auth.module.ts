import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PlayerModule } from '../users/player/player.module';
import { TeacherModule } from '../users/teacher/teacher.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'jwt_secret_key', // cambia esto en producción
      signOptions: { expiresIn: '1d' },
    }),
    PlayerModule,
    TeacherModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
