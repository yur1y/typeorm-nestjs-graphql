import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';
import { WeightClass } from '../../../shared/enums/weight-class.enum';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nickname?: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  reach?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  stance?: string;

  @Field(() => WeightClass)
  @IsNotEmpty()
  weightClass: WeightClass;
}
