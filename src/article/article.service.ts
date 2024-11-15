// article.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) {}

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
