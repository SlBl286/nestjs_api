import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { CdnModule } from './cdn/cdn.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppGateway } from './event/event.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    AuthModule,
    UserModule,
    PrismaModule,
    PostModule,
    CategoryModule,
    CdnModule,
  ],
  providers: [AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
