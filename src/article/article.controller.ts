import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus,
   Get, Param,Request,Patch,Delete,
   Query} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './article.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('article')
export class ArticleController {
constructor(private readonly articleService: ArticleService) {}
      
@Post()
async createArticle(@Body() createArticleDto: CreateArticleDto) {
  return this.articleService.createArticle(createArticleDto);
}

@Get()
async findAll() {
  return this.articleService.findAll();
}

  // create article
  // Only logged-in users can create articles
  @UseGuards(JwtAuthGuard)
  @Post("test")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    return this.articleService.createArticle(req.user.userId);
  }

  // Delete an article
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.articleService.deleteArticle(Number(id));
  }
   
}
