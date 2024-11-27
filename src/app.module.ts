import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from 'src/article/article.module';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { FollowersModule } from './followers/followers.module';
import { FollowerController } from './followers/followers.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      autoLoadEntities: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      dropSchema:true 
    }),
    ArticleModule,
    UserModule,
    AppModule,
    FollowersModule,
  ],
  controllers: [AppController, FollowerController, FollowerController],
  providers: [AppService],
})
export class AppModule {}