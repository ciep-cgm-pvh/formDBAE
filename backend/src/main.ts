import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

// Esta função cria uma instância do seu app NestJS
// e a conecta a um servidor Express existente.
const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  // Mantenha suas configurações globais aqui
  app.enableCors({
    origin: '*', // Ajuste para produção se necessário
  });

  return app.init();
};

// Se não estiver no ambiente de produção da Vercel,
// inicie o servidor localmente da forma tradicional.
if (process.env.VERCEL_ENV !== 'production') {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*', // Permite todas as origens, ajuste conforme necessário
    });
    await app.listen(process.env.PORT ?? 3003, '0.0.0.0');
  }
  bootstrap();
}

// Exporta o handler que a Vercel usará para processar as requisições
export default createNestServer(express());


