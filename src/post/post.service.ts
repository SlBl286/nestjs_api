import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostCreateDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(createPostDto: PostCreateDto, user: User) {
    return   this.prisma.post.create({
      data: {
        content: createPostDto.content,
        likeCount: 0,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async deletePost(id: number) {
    return this.prisma.post.delete({
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new ForbiddenException('Post not exist');
    });
  }
}
