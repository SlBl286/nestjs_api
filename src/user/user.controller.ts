import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserInfoUpdateDto } from './dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@GetUser() user: User) {

    var a = await this.userService.getUserInfo(user.id);
        console.log(a);
        return a;
  }
  @UseGuards(JwtGuard)
  @Put('me')
  async updateMe(@Body() userDto: UserInfoUpdateDto, @GetUser() user: User) {
    var updatedUser = await this.userService.updateUser(userDto, user);
    delete updatedUser.id;

    delete updatedUser.hash;
    return updatedUser;
  }

  @UseGuards(JwtGuard)
  @Delete('me')
  async deleteMe(@GetUser() user: User) {
    await this.userService.deleteUser(user.id);
    return {};
  }
}
