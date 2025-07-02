import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassesService } from './class.service';
import { ClassesController } from './class.controller';
import { Teacher } from 'src/users/teacher/teacher.entity';
import { Player } from 'src/users/player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Teacher, Player])],
  providers: [ClassesService],
  controllers: [ClassesController],
  exports: [ClassesService, TypeOrmModule],
})
export class ClassesModule {}
