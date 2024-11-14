// src/users/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  getUserById(userId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    
    return this.userRepository.save(newUser);
  }

  // Add more user-related methods like finding users, etc.
}
