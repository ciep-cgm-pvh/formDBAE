import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';


// Lista de origens permitidas
const allowedOrigins = [
  'https://formulario-dbae.vercel.app', // Seu frontend na Vercel
  'http://localhost:3000', // Para desenvolvimento local do frontend
];

// Configuração do CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem 'origin' (ex: Postman, apps mobile)
    if (!origin) return callback(null, true);

    // Se a origem estiver na lista, permite a requisição
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      // Se não estiver, rejeita a requisição
      return callback(new Error('Not allowed by CORS'));
    }
  },
};


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


