import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  process.on('unhandledRejection', (reason) => {
    new Logger('UnhandledRejection').error(reason);
  });

  process.on('uncaughtException', (error) => {
    new Logger('UncaughtException').fatal(error);
    process.exit(1);
  });

  const config = new DocumentBuilder()
    .setTitle('MRG Data API')
    .setDescription('API для работы с данными МРГ')
    .setVersion('1.0')
    .build();

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
