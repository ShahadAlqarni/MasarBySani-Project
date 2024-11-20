import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowerController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './followers.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follower, User])], // Register entities
  providers: [FollowersService],
  controllers: [FollowerController],
  exports: [FollowersService], // Export if needed by other modules
})
export class FollowersModule {}
