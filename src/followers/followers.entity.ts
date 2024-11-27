import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Follower {

  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => User, (user) => user.followers)
  follower: User;

  @ManyToOne(() => User, (user) => user.following)
  following: User;

  @CreateDateColumn()
  followedAt: Date;
}
