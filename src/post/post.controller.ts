import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PostCreateDto } from './dto';
import { PostService } from './post.service';


@ApiBearerAuth()
@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @UseGuards(JwtGuard)
    @Post('create')
    async createPost(@Body() postDto: PostCreateDto, @GetUser() user:User){
        return this.postService.createPost(postDto,user)
    }
}
