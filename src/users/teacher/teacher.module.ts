import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { ClassesModule } from 'src/class/class.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), 
            ClassesModule
],
  providers: [TeacherService],
  controllers: [TeacherController],
  exports: [TeacherService],
})
export class TeacherModule {}