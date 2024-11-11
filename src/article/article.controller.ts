import { Controller, Post, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {
constructor(private readonly articleService: ArticleService) {}
      
 @Post()
async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
return this.articleService.create(createArticleDto);
}
}
