// article.service.ts
import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './create-article.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class ArticleService {
    dataSource: any;
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) {}

    @Post('/fillArticles')
async fillArticles() {
  const articlesRepo: Repository<Article> = this.dataSource.getRepository(Article);

  const chunkSize = 10_000;
  const totalArticles = 500_000; // Adjust based on your needs
  const articles = [];

  for (let i = 0; i < totalArticles; i++) {
    const randomTitle = faker.lorem.words(5);
    const randomContent = faker.lorem.paragraphs(3);
    const randomUserId = Math.floor(Math.random() * 1000000); // Random user ID

    articles.push({
      title: randomTitle,
      content: randomContent,
      authorId: randomUserId,
    });

    if (articles.length === chunkSize) {
      await articlesRepo.insert(articles);
      articles.length = 0; // Clear after inserting a chunk
    }
  }

  if (articles.length > 0) {
    await articlesRepo.insert(articles);
  }

  return 'done';
}

    async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        const article = this.articleRepository.create(createArticleDto);
        return this.articleRepository.save(article);
    }

    async findAll(): Promise<Article[]> {
        return this.articleRepository.find();
      }

    async deleteArticle(id: number): Promise<void> {
        await this.articleRepository.delete(id);

        
    }
}
