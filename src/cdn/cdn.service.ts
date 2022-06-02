import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CdnService {
  constructor(private prisma: PrismaService) {}

  async upload(media: Array<Express.Multer.File>, postId: number) {
    console.log('media', media);
    if (media.length <= 0) throw new ForbiddenException('Media is required');

    for (let index = 0; index < media.length; index++) {
      var a = await this.prisma.media.create({
        data: {
          fileName: media[index].originalname,
          type: media[index].mimetype,
          size: media[index].size,
          url: media[index].path,
          endCoding: media[index].encoding,
          order: index + 1,
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
      // console.log(a);
    }
  }
  async get(mediaId: number) {
    var media = await this.prisma.media.findUnique({
      where: {
        id: mediaId,
      },
    });
    return media;
  }
  async delete(mediaId: number) {
    var media = await this.prisma.media
      .delete({
        where: {
          id: mediaId,
        },
      })
      .catch((e) => {
        throw new ForbiddenException('Media not exist');
      });
    return media;
  }
}
