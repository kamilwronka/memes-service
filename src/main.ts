import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as config from '../package.json';

async function bootstrap() {
  console.log(process.env);

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Memes service description')
    .setVersion(config.version)
    .addTag('memes')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('memes-service/swagger', app, document);

  app.setGlobalPrefix('memes-service');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
