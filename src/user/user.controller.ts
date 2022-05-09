import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserDto } from './dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    delete user.id;
    return user;
  }
  @UseGuards(JwtGuard)
  @Put('me')
  async updateMe(@Body() userDto: UserDto, @GetUser() user: User) {
    var updatedUser = await this.userService.updateUser(userDto, user);
    delete updatedUser.id;
    delete updatedUser.hash;
    return updatedUser;
  }
}
