// src/users/user.service.ts
import { Injectable, Post } from '@nestjs/common';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  userRepo: any;
 
  async findByName(name: string): Promise<User> {
    return this.userRepo.findOne({ where: { name } });
  }
  
  getUserById(userId: number) {
    throw new Error('Method not implemented.');
  }

  // Hash the password
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

}
