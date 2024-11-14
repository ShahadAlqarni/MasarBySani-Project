// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Register User entity here
    ],
    providers: [UserService],
    exports: [UserService], // Export if needed in other modules
})
export class UserModule {}
