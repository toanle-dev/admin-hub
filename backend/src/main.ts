import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // Habilita validação global com transformação
  app.useGlobalPipes(
    new ValidationPipe({
      // Ativa a transformação automática
      transform: true,
      // Remove campos não declarados no DTO
      whitelist: true,
      // Erro caso campos extras sejam enviados
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
