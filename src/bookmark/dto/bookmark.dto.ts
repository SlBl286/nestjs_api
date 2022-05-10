import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BookmarkDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ required: false, nullable: true })
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  link: string;
}
