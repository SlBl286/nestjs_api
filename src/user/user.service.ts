import { Injectable } from '@nestjs/common';
import { User,UserInfo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInfoDto, UserInfoUpdateDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
    
    async getUserInfo(id:number){

        var userInfo = await this.prisma.userInfo.findUnique({
            where:{
                userId:id
            }
        })
        if(userInfo == null){
            return new UserInfoDto();
                
            
        }
        return userInfo;
    }

  async updateUser(userDto: UserInfoUpdateDto, user: User) {
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
