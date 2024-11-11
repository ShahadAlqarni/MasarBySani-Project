import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  Currency: string;

  @Column({nullable:true})
  amount: number;

  @Column({})
  xyz: number;

  @Column({ default: true })
  isActive: boolean;

}
