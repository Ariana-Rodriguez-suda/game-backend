import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PlayerModule } from '../users/player/player.module';
import { TeacherModule } from '../users/teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/users/teacher/teacher.entity';
import { Player } from 'src/users/player/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Player]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
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
