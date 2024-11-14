// article.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './create-article.dto';
import { PaginationDto } from '../common/dto/pagination.dto';


@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) {}

    async createArticle(createArticleDto: CreateArticleDto, userId: number): Promise<Article> {
        const article = this.articleRepository.create({
            ...createArticleDto,
            // userId, Assuming userId is part of the article
        });
        return this.articleRepository.save(article);
    }

    async findAll(paginationDto: PaginationDto): Promise<Article[]> {
        const { page, pageSize, searchTerm } = paginationDto;
    
        const queryBuilder = this.articleRepository.createQueryBuilder('article');
    
        if (searchTerm) {
          queryBuilder.where('article.title LIKE :searchTerm', {
            searchTerm: `%${searchTerm}%`,
          });
        }
    
        // Paginate: offset based on page and pageSize
        queryBuilder.skip((page - 1) * pageSize).take(pageSize);
    
        return await queryBuilder.getMany();
    }

    /*
    async findOne(id: number): Promise<Article> {
        return this.articleRepository.findOne(id);
    }
*/
    async deleteArticle(id: number): Promise<void> {
        await this.articleRepository.delete(id);
    }
}
