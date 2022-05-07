import { ForbiddenException, Injectable } from '@nestjs/common';
import { Bookmark, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(
    bookmarkDto: BookmarkDto,
    currentUserId: number,
  ): Promise<Bookmark> {
    var bookmark = await this.prisma.bookmark.create({
      data: {
        title: bookmarkDto.title,
        description: bookmarkDto.description,
        link: bookmarkDto.link,
        user: { connect: { id: currentUserId } },
      },
    });
    return bookmark;
  }
  async listByUser(userId: number): Promise<Bookmark[]> {
    return await this.prisma.bookmark.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
  async deleteBookmark(id: number): Promise<Bookmark> {
    var bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: id,
      },
    });
    if (bookmark) {
      return await this.prisma.bookmark.delete({
        where: {
          id,
        },
      });
    } else {
      throw new ForbiddenException('Bookmark not found');
    }
  }

  async bookmarkInfo(id: number): Promise<Bookmark> {
    return await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    });
  }

  async updateBookmark(
    id: number,
    bookmarkDto: BookmarkDto,
  ): Promise<Bookmark> {
    var bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    });
    if (bookmark) {
      return await this.prisma.bookmark.update({
        where: {
          id,
        },
        data: {
          title: bookmarkDto.title,
          description: bookmarkDto.description,
          link: bookmarkDto.link,
        },
      });
    } else {
      throw new ForbiddenException('Bookmark not found');
    }
  }
}
