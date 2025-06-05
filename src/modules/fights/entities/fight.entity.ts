import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fighter } from '../../fighters/entities/fighter.entity';
import { Event } from '../../events/entities/event.entity';
import { WeightClass } from '../../../shared/enums/weight-class.enum';
import { FightResult } from '../../../shared/enums/fight-result.enum';
import { FinishType } from '../../../shared/enums/finish-type.enum';

@Entity()
@ObjectType()
export class Fight {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Event, (event) => event.fights)
  @Field(() => Event)
  event: Event;

  @ManyToOne(() => Fighter)
  @Field(() => Fighter)
  fighter1: Fighter;

  @ManyToOne(() => Fighter)
  @Field(() => Fighter)
  fighter2: Fighter;

  @Column({ type: 'enum', enum: WeightClass })
  @Field(() => WeightClass)
  weightClass: WeightClass;

  @Column()
  @Field(() => Int)
  rounds: number;

  @Column({ type: 'enum', enum: FightResult, nullable: true })
  @Field(() => FightResult, { nullable: true })
  result?: FightResult;

  @ManyToOne(() => Fighter, { nullable: true })
  @Field(() => Fighter, { nullable: true })
  winner?: Fighter;

  @Column({ type: 'enum', enum: FinishType, nullable: true })
  @Field(() => FinishType, { nullable: true })
  finishType?: FinishType;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  finishTime?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  finishRound?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
