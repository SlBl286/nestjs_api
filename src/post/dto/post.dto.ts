import { ApiProperty } from '@nestjs/swagger';
import { Media } from '@prisma/client';
import {  IsNotEmpty, IsString } from 'class-validator';

export class PostCreateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    mediaList: Media[];
}
