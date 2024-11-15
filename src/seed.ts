import { DataSource } from 'typeorm';
import { Article } from './article/article.entity';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port:  5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Article],
  synchronize: false, 
});

async function seed() {
  await AppDataSource.initialize();

  const articleRepository = AppDataSource.getRepository(Article);

  const articles = Array.from({ length: 1000 }, () => ({
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(3),
  }));

  await articleRepository.insert(articles);

  console.log('1000 articles created');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Error seeding data:', error);
  process.exit(1);
});