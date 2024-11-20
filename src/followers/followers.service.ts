import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from './followers.entity';
import { User } from '../users/users.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async followUser(followerId: number, followingId: number): Promise<Follower> {
    const follower = await this.userRepository.findOneBy({ id: followerId });
    const following = await this.userRepository.findOneBy({ id: followingId });

    if (!follower || !following) {
      throw new Error('Invalid follower or following user ID');
    }

    const newFollow = this.followerRepository.create({ follower, following });
    return this.followerRepository.save(newFollow);
  }

  async getFollowers(userId: number): Promise<Follower[]> {
    return this.followerRepository.find({
      where: { following: { id: userId } },
      relations: ['follower'],
    });
  }

  async getFollowing(userId: number): Promise<Follower[]> {
    return this.followerRepository.find({
      where: { follower: { id: userId } },
      relations: ['following'],
    });
  }
}