import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GetPresignedUrlDto } from './dto/getPresignedUrl.dto';
import { GetMemesQueryDto } from './dto/getMemesQuery.dto';
import { MemesService } from './memes.service';
import { CreateMemeDto } from './dto/createMeme.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
export class MemesController {
  constructor(private memesService: MemesService) {}

  @ApiTags('memes-service')
  @Get('memes')
  getMemes(@Query() query: GetMemesQueryDto) {
    return this.memesService.find(query);
  }

  @ApiTags('memes-service')
  @Post('create')
  async createMeme(
    @Body() createMemeBody: CreateMemeDto,
    @Res() res: Response,
  ) {
    let response;
    try {
      response = await this.memesService.create(createMemeBody);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }

    return res
      .status(HttpStatus.OK)
      .send({ message: 'Meme has been successfully uploaded.' });
  }

  @ApiTags('memes-service')
  @Post('presignedUrl')
  async getPresignedUrl(
    @Body() presignedUrlBody: GetPresignedUrlDto,
    @Res() res: Response,
  ) {
    let presignedUrl: string;

    try {
      presignedUrl = await this.memesService.getPresignedUrl({
        contentType: presignedUrlBody.contentType,
      });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Unable to create presigned url.' });
    }

    return res.status(HttpStatus.OK).send({ url: presignedUrl });
  }
}
