import { Injectable } from '@nestjs/common';
import { User, UserInfo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInfoDto, UserInfoUpdateDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(id: number) {
    var userInfo = new UserInfoDto();
    var userInfoQuery = await this.prisma.userInfo.findUnique({
      where: {
        userId: id,
      },
    });
    if (userInfoQuery != null) {
      userInfo.avatar = userInfoQuery.avatar;
      userInfo.bio = userInfoQuery.bio;
      userInfo.name = userInfoQuery.name;
      userInfo.nickname = userInfoQuery.nickname;
      userInfo.website = userInfoQuery.website;
    }
    var userQuery = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    userInfo.email = userQuery.email;
    return userInfo;
  }

  async updateUser(userDto: UserInfoUpdateDto, user: User) {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        info: {
          upsert: {
            create: {
              name: userDto.name,
              nickname: userDto.nickName,
              avatar: userDto.avatar,
              bio: userDto.bio,
              website: userDto.website,
            },
            update: {
              name: userDto.name,
              nickname: userDto.nickName,
              avatar: userDto.avatar,
              bio: userDto.bio,
              website: userDto.website,
            },
          },
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
