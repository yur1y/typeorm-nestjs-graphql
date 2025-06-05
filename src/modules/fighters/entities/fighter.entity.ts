import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WeightClass } from '../../../shared/enums/weight-class.enum';
import { Fight } from '../../fights/entities/fight.entity';
import { FighterRecord } from './fighter-record.entity';
import { Ranking } from '../../rankings/entities/ranking.entity';

@Entity()
@ObjectType()
export class Fighter {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  nickname?: string;

  @Column({ type: 'date' })
  @Field()
  dateOfBirth: Date;

  @Column('float')
  @Field(() => Float)
  height: number;

  @Column('float')
  @Field(() => Float)
  weight: number;

  @Column('float', { nullable: true })
  @Field(() => Float, { nullable: true })
  reach?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  stance?: string;

  @Column({ type: 'enum', enum: WeightClass })
  @Field(() => WeightClass)
  weightClass: WeightClass;

  @OneToOne(() => FighterRecord, (record) => record.fighter)
  @Field(() => FighterRecord)
  record: FighterRecord;

  @OneToMany(() => Fight, (fight) => fight.fighter1 || fight.fighter2)
  @Field(() => [Fight])
  fights: Fight[];

  @OneToOne(() => Ranking, (ranking) => ranking.fighter, { nullable: true })
  @Field(() => Ranking, { nullable: true })
  currentRanking?: Ranking;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
