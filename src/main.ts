import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as config from '../package.json';
import { Logger, ValidationPipe } from '@nestjs/common';
import configuration, { initializeConfig } from './config/configuration';

async function bootstrap() {
  await initializeConfig();
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

  await app.listen(apiConfig.port, () => {
    Logger.log(
      `Memes service is running on port ${apiConfig.port}, press Ctrl+C to exit.`,
    );
  });
}
bootstrap();
