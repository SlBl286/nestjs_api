import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
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
