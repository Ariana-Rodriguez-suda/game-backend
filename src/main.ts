import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Avatar } from './avatar/avatar.entity';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['https://game-frontend-navy.vercel.app'],
      credentials: true,
    },
  });
  await app.listen(process.env.PORT || 3000);
  const dataSource = app.get(DataSource);
  const avatarRepo = dataSource.getRepository(Avatar);

  const defaultAvatars = [
    { name: 'Alicia', imageUrl: '/assets/sprites/avatar-girl-temporal.png' },
    { name: 'Ricardo', imageUrl: '/assets/sprites/avatar-boy-temporal.png' },

  ];

  for (const avatar of defaultAvatars) {
    const exists = await avatarRepo.findOne({ where: { name: avatar.name } });
    if (!exists) {
      await avatarRepo.save(avatar);
      console.log(`✅ Avatar creado: ${avatar.name}`);
    } else {
      console.log(`✔️ Avatar ya existe: ${avatar.name}`);
    }
  }
}

bootstrap();
