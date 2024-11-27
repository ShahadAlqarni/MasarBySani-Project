import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import { User } from './users.entity';

@Injectable()
export class SeederService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async seedUsers(count: number): Promise<void> {
    const users = Array.from({ length: count }).map(() => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: faker.datatype.number({ min: 18, max: 100 }),
    }));
    await this.userRepo.insert(users);
  }
}
