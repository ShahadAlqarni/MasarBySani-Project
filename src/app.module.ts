import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment/payment.module';
import { BookingModule } from './booking/booking.module';
import { ArticleModule } from './article/article.module';


@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'masar',
    //entities: [Payment],
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
  }), PaymentModule, BookingModule, ArticleModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
