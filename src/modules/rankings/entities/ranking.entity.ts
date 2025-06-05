import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fighter } from '../../fighters/entities/fighter.entity';
import { WeightClass } from '../../../shared/enums/weight-class.enum';

@Entity()
@ObjectType()
export class Ranking {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @OneToOne(() => Fighter)
  @JoinColumn()
  @Field(() => Fighter)
  fighter: Fighter;

  @Column({ type: 'enum', enum: WeightClass })
  @Field(() => WeightClass)
  weightClass: WeightClass;

  @Column()
  @Field(() => Int)
  position: number;

  @Column('float')
  @Field(() => Float)
  points: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
