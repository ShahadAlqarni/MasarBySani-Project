import { Controller, Post, Delete, Param, Get, Req, UseGuards } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('follower')
@UseGuards(JwtAuthGuard)
export class FollowerController {
  constructor(private readonly followerService: FollowersService) {}

  @Post(':userId')
  async followUser(@Req() req, @Param('userId') userId: number) {
    const currentUserId = req.user.id;
    return this.followerService.followUser(currentUserId, userId);
  }

  @Get('followers/:userId')
  async getFollowers(@Param('userId') userId: number) {
    return this.followerService.getFollowers(userId);
  }

  @Get('following/:userId')
  async getFollowing(@Param('userId') userId: number) {
    return this.followerService.getFollowing(userId);
  }
}
