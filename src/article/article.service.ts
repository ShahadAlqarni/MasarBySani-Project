import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article)
        private articleRepository: Repository<Article>,
      ) {}
    
      async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const article = this.articleRepository.create(createArticleDto);
        return this.articleRepository.save(article);
      }
}
