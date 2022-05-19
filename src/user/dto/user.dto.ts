import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserInfoUpdateDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  nickName: string;
  @ApiProperty()
  @IsString()
  avatar: string;
  @ApiProperty()  
  @IsString()
  bio: string;
  @ApiProperty()
  @IsString()
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

