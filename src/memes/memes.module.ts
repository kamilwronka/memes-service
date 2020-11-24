import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MemesController } from './memes.controller';
import { MemesService } from './memes.service';

@Module({
  controllers: [MemesController],
  providers: [MemesService],
  imports: [ConfigModule],
})
export class MemesModule {}
