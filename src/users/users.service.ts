// src/users/user.service.ts
import { Injectable, Post } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) { }

  @Post('/fillCustomers')
  async fillCustomers() {
    const customersRepo: Repository<User> =
      this.dataSource.getRepository(User);

    // Choose a suitable chunk size
    const chunkSize = 10_000;
    const totalUsers = 1_000_000;
    const users = [];

    for (let i = 0; i < totalUsers; i++) {
      const randomName = faker.internet.userName();
      const randomEmail = faker.internet.email();
      const randomCity = faker.location.city();

      users.push({
        name: randomName,
        email: randomEmail,
        city: randomCity,
      });

      // Insert in chunks
      if (users.length === chunkSize) {
        console.log('Inserting chunk Number:', i / chunkSize);
        console.log('Percentage done:', (i / totalUsers) * 100 + '%');
        await customersRepo.insert(users);
        users.length = 0; // clear the array
      }
    }

    // Insert any remaining users
    if (users.length > 0) {
      await customersRepo.insert(users);
    }

    return 'done';
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
