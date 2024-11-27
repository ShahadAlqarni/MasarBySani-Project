// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserService } from './users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, 
          }),
        TypeOrmModule.forFeature([User]), // Register User entity here
    ],
    providers: [UserService],
    exports: [UserService], // Export if needed in other modules
})
export class UserModule {}
