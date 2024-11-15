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

    // Register a new user
    async create(createUserDto: CreateUserDto): Promise<User> {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return this.userRepository.save(user);
    }
    
    // Hash the password
    async hashPassword(password: string): Promise<string> {
      return bcrypt.hash(password, 10);
    }

    async validatePassword(password: string, hash: string): Promise<boolean> {
      return bcrypt.compare(password, hash);
    }
}
