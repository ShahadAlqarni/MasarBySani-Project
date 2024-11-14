// src/ormconfig.ts

import { DataSource } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Article } from 'src/article/article.entity';
import { ConfigService } from '@nestjs/config'; // If you want to use environment variables

export default {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'postgres',
    entities: [User, Article],
    migrations: ['src/migration/**/*.ts'],
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
};
