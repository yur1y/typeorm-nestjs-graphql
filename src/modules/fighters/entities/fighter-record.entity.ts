import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Fighter } from './fighter.entity';

@Entity()
@ObjectType()
export class FighterRecord {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Int)
  wins: number;

  @Column()
  @Field(() => Int)
  losses: number;

  @Column()
  @Field(() => Int)
  draws: number;

  @Column()
  @Field(() => Int)
  noContests: number;

  @Column()
  @Field(() => Int)
  knockouts: number;

  @Column()
  @Field(() => Int)
  submissions: number;

  @OneToOne(() => Fighter)
  @JoinColumn()
  @Field(() => Fighter)
  fighter: Fighter;
}
