import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    // 
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
