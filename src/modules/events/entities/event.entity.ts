import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fight } from '../../fights/entities/fight.entity';

@Entity()
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ type: 'timestamp' })
  @Field()
  date: Date;

  @Column()
  @Field()
  venue: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  country: string;

  @OneToMany(() => Fight, (fight) => fight.event)
  @Field(() => [Fight])
  fights: Fight[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
