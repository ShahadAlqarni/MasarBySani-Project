import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, Index} from 'typeorm';
import { Follower } from '../followers/followers.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Index()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Follower, (follower) => follower.following)
    followers: Follower[];
  
    @OneToMany(() => Follower, (follower) => follower.follower)
    following: Follower[];

    @Column({ nullable: true })
    profilePictureUrl: string;
  
    @CreateDateColumn()
    createdAt: Date;
    
}