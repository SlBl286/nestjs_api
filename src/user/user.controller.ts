import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { unlink } from 'fs';
import { join } from 'path';
import { saveImageToStorage } from 'src/helpers/imagestorage';
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
  @Post('avatar')
  @UseInterceptors(FilesInterceptor('image', 1, saveImageToStorage))
  async updateAvatar(
    @UploadedFiles() image: Array<Express.Multer.File>,
    @GetUser() user: User,
  ) {
    var userInfo = await this.userService.updateAvatar(image.pop(), user.id);
    if (userInfo != null) {
      var url = './public/uploads/' + userInfo.avatar;
      const file = join(process.cwd(), url);
      new Promise<void>((resolve, reject) => {
        unlink(file, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
     return {
      message: 'Updated avatar',
      statusCode: 200,
    };
  }

  @UseGuards(JwtGuard)
  @Put('me')
  async updateMe(@Body() userDto: UserInfoUpdateDto, @GetUser() user: User) {
    console.log(userDto);
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
