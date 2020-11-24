import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetMemesQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  page: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pageSize: string;
}
