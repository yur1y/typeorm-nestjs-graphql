import { InputType, Field, Float } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { WeightClass } from '../../../shared/enums/weight-class.enum';

@InputType()
export class UpdateFighterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nickname?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  height?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  reach?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  stance?: string;

  @Field(() => WeightClass, { nullable: true })
  @IsOptional()
  weightClass?: WeightClass;
}
