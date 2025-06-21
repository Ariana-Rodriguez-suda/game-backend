import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassesService } from './class.service';
import { ClassesController } from './class.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  providers: [ClassesService],
  controllers: [ClassesController],
})
export class ClassesModule {}
