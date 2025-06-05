import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsOptional, IsEnum, IsDate, IsNumber, Min } from 'class-validator';
import { WeightClass } from '../../../shared/enums/weight-class.enum';

@InputType()
export class RankingSearchInput {
  @Field(() => WeightClass, { nullable: true })
  @IsOptional()
  @IsEnum(WeightClass)
  weightClass?: WeightClass;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPoints?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  position?: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  fromDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  toDate?: Date;
}
