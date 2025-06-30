import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClassesModule } from './class/class.module';
import { LevelModule } from './level-1/level-1.module';
import { PlayerModule } from './users/player/player.module';
import { TeacherModule } from './users/teacher/teacher.module';
import { Level2Module } from './level-2/level-2.module';
import { Level3Module } from './level-3/level-3.module';
import { AvatarModule } from './avatar/avatar.module';
import { MapModule } from './map/map.module';
import { ShopModule } from './shop/shop.module';
import { ProgressModule } from './progress/progress.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    AuthModule,
    ClassesModule,
    LevelModule,
    PlayerModule,
    TeacherModule,
    Level2Module,
    Level3Module,
    AvatarModule,
    MapModule,
    ShopModule,
    ProgressModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
