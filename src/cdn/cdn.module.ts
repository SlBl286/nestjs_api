import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CdnController } from './cdn.controller';
import { CdnService } from './cdn.service';

@Module({
  imports: [
    MulterModule.registerAsync({
        imports: [ConfigService],
     useFactory:async (configService:ConfigService) => ({

      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, configService.get('UPLOAD_DIR'));
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix+'.'+file.mimetype.split('/')[1]);
        },
      })
     }),
        inject: [ConfigService],
    }),
  ],
  controllers: [CdnController],
  providers: [CdnService],
})
export class CdnModule {
}
