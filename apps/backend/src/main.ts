import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This line is essential for allowing the frontend to talk to the backend
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
