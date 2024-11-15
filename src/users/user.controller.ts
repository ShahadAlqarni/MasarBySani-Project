// src/users/user.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserProfileDto } from './dto/UserProfileDto.dto';


@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Define an API endpoint to return a subset of user data
  @Get(':id/profile')
  getUserProfile(@Param('id') userId: number): UserProfileDto {
    const user = this.userService.getUserById(userId);

    // Create a DTO object containing only the name and email properties
    const userProfileDto = new UserProfileDto();
   // userProfileDto.name = user.name;
    // userProfileDto.email = user.email;

    // Return the DTO object as the API response
    return userProfileDto;
  }
    
}
