import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Bookmark, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto';
@ApiBearerAuth()
@ApiTags('bookmark')
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Bookmark has been successfully created.',
    type: BookmarkDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createBookmark(
    @Body() bookmarkDto: BookmarkDto,
    @GetUser() user: User,
  ): Promise<Bookmark> {
    return await this.bookmarkService.createBookmark(bookmarkDto, user.id);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteBookmark(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Bookmark> {
    return await this.bookmarkService.deleteBookmark(id);
  }

  @ApiBody({
    type: [BookmarkDto],
    description: 'list bookmark of current user',
  })
  @UseGuards(JwtGuard)
  @Get('list')
  async listByUser(@GetUser() user: User): Promise<Bookmark[]> {
    return await this.bookmarkService.listByUser(user.id);
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async bookmarkInfo(@Param('id', ParseIntPipe) id: number): Promise<Bookmark> {
    return await this.bookmarkService.bookmarkInfo(id);
  }
  @ApiBody({ type: BookmarkDto, description: 'Update bookmark data' })
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateBookmark(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookmarkDto: BookmarkDto,
  ): Promise<Bookmark> {
    return await this.bookmarkService.updateBookmark(id, bookmarkDto);
  }
}
