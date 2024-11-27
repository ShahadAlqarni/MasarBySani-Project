import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from 'src/article/article.module';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { FollowersModule } from './followers/followers.module';
import { FollowerController } from './followers/followers.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Article } from './article/article.entity';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<string>('DB_PORT'),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASSWORD'), 
        database: configService.get<string>('DB_NAME'),
        entities: [User, Article, Comment],
        autoLoadEntities: false,
        synchronize: false,
      }),
    }),
    UserModule,
    ArticleModule,
    AuthModule,
    FollowersModule,
  ],
  controllers: [AppController, FollowerController, FollowerController],
  providers: [AppService],
})
export class AppModule {}