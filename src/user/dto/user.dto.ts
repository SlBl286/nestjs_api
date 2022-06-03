import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserInfoUpdateDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsString()
  nickName: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  bio: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  website: string;
}

export class UserInfoDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  nickname: string;
  @ApiProperty()
  @IsString()
  bio: string;
  @ApiProperty()
  @IsString()
  avatar: string;
  @ApiProperty()
  @IsString()
  website: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  followers: number[];
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  following: number[];
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  gender: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;
  @IsNumber()
  @IsOptional()
  posts: number[];
}
