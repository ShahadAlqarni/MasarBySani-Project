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
      
@Get()
async getArticles(@Query() paginationDto: PaginationDto): Promise<Article[]> {
  return this.articleService.findAll(paginationDto);
}

  // create article
  // Only logged-in users can create articles
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req,
  ): Promise<Article> {
    return this.articleService.createArticle(createArticleDto, req.user.userId);
  }
  /*
  // get all articles
  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }
*/
  /*
  // Get an article by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articleService.findOne(Number(id));
  }
*/


  // Delete an article
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.articleService.deleteArticle(Number(id));
  }


/*
async function seedArticles() {
    const articles = Array.from({ length: 1000 }).map(() => ({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        authorId: randomUserId, // randomly assign from existing users
    }));

    await articleRepository.save(articles);
  }
    */
   
}
