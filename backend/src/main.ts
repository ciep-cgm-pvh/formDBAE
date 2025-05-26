import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permite todas as origens, ajuste conforme necessário
  });
  await app.listen(process.env.PORT ?? 3003, '0.0.0.0');
}
bootstrap();
