import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { MemesModule } from './memes/memes.module';

@Module({
  imports: [
    MemesModule,
    ConfigModule.forRoot({
      load: [async () => await configuration()],
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
