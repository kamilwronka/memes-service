import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetPresignedUrlDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentType: string;
}
