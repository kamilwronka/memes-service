import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as config from '../package.json';
import { ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';

async function bootstrap() {
  const apiConfig = configuration();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('memes-service');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Memes service description')
    .setVersion(config.version)
    .addTag('memes-service')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('memes-service/swagger', app, document);

  await app.listen(apiConfig.port);
}
bootstrap();
