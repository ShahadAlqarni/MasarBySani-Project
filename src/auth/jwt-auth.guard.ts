import { Body, Injectable, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateArticleDto } from 'src/article/create-article.dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    articlesService: any;
    @UseGuards(JwtAuthGuard)
    @Post('articles')
    createArticle(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }
}