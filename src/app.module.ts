import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClassesModule } from './class/class.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5432,
      username:'postgres',
      password: 'aZdq34#$hjF',
      database: 'aventura_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule, 
    AuthModule, 
    ClassesModule,
  ],
  controllers: [AppController],  // solo AppController aquí
  providers: [AppService],       // solo AppService aquí
})
export class AppModule {}
