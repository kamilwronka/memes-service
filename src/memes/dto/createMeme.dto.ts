import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateMemeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imgUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  tags: string[];
}
