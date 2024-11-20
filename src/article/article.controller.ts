import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus,
   Get, Param,Request,Delete} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {
  dataSource: any;
constructor(private readonly articleService: ArticleService) {}
      
@Get('/users/:name')
async getUserByName(@Param('name') name: string) {
  console.time('queryTime');  // Start measuring query time
  const user = await this.dataSource
    .getRepository(Article)
    .findOneBy({ name });
  console.timeEnd('queryTime');  // Log the query time
  return user;
}

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
