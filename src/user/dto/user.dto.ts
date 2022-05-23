import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

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

export class UserInfoDto{
    @IsEmail()
    email: string;
    @IsString()
    name: string;
    @IsString()
    nickname: string;
    @IsString()
    bio: string;
    @IsString()
    avatar: string;
    @IsString()
    website: string;
}

