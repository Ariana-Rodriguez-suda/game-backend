import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassesService } from './class.service';
import { ClassesController } from './class.controller';
import { Teacher } from 'src/users/teacher/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Teacher])],
  providers: [ClassesService],
  controllers: [ClassesController],
  exports: [ClassesService, TypeOrmModule],
})
export class ClassesModule {}
