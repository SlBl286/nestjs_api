import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostCreateDto } from './dto';

@Injectable()
export class PostService {
    constructor(private prisma:PrismaService){}

    async createPost(createPostDto: PostCreateDto,user:User){
        this.prisma.post.create({
            data: {
                content: createPostDto.content,
                mediaList:{
                    create:[
                        {content:"",type:"",order:1},
                        {content:"",type:"",order:1}
                    ]
                },
                likeCount:0,
                user:{
                    connect:user,
                }
                
            }
        })
    }
}
