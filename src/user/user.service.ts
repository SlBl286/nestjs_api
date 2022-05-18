import { Injectable } from '@nestjs/common';
import { User,UserInfo } from '@prisma/client';
import { userInfo } from 'os';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(userDto: UserDto, user: User) {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        info :{
          update: {
            name: userDto.name,
            nickname: userDto.nickName,
            avatar: userDto.avatar,
            bio: userDto.bio,
            website: userDto.website

          }
        },
      },
    });
  }
  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
