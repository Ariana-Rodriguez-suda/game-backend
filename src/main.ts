import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['https://game-frontend-navy.vercel.app'],
      credentials: true,
    },
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
