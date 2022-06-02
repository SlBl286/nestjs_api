import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  Response,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { createReadStream, unlink } from 'fs';
import { join } from 'path';
import { of } from 'rxjs';
import { JwtGuard } from 'src/auth/guard';

import { CdnService } from './cdn.service';

@ApiTags('CDN')
@Controller('cdn')
export class CdnController {
  constructor(private cdnService: CdnService) {}
  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('media'))
  async uploadFile(
    @UploadedFiles() media: Array<Express.Multer.File>,
    @Query('postId', ParseIntPipe) postId: number,
  ) {
    // console.log(media);
    return this.cdnService.upload(media, postId);
  }
  @UseGuards(JwtGuard)
  @Get('/media/:mediaId')
  async getFile(
    @Param('mediaId', ParseIntPipe) mediaId: number,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    var media = await this.cdnService.get(mediaId);
    console.log(media);
    res.setHeader('Content-Type', media.type);

    const file = createReadStream(join(process.cwd(), media.url));
    return new StreamableFile(file);
  }
  @UseGuards(JwtGuard)
  @Get('/:fileName')
  async getFileByName(
    @Param('fileName') fileName: string,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    res.setHeader('Content-Type', fileName.split('.').at(1));

    const file = createReadStream(
      join(process.cwd(), './public/uploads/' + fileName),
    );
    return new StreamableFile(file);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteFile(@Param('id', ParseIntPipe) mediaId: number) {
    var media = await this.cdnService.delete(mediaId);
    console.log(media);
    var url = media.fileName;
    const file = join(process.cwd(), media.url);
    new Promise<void>((resolve, reject) => {
      unlink(file, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    return {
      message: 'File deleted',
      statusCode: 200,
    };
  }
}
