import { Controller, Post, Body, Get, Param, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './users.entity';


@Controller('users')
export class UserController {
  dataSource: any;
  constructor(private userService: UserService) {}
  
  @Get('find')
  async findByName(@Query('name') name: string) {
    return this.userService.findByName(name);
  }
  
  @Get('/users/:name')
  async getUserByName(@Param('name') name: string) {
    console.time('queryTime');  // Start measuring query time
    const user = await this.dataSource
      .getRepository(User)
      .findOneBy({ name });
    console.timeEnd('queryTime');  // Log the query time
    return user;
  }
  
  @Get('/myProfile')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req) {
    return this.userService.getUserById(req.user.id);
  }
  
    
}
