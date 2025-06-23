import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { ClassesModule } from 'src/class/class.module';
import { Class } from 'src/class/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Class]),
  ClassesModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule], // <-- Exportar también TypeOrmModule
})
export class UserModule {}
