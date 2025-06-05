import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsNumber, Min, Max } from 'class-validator';
import { WeightClass } from '../../../shared/enums/weight-class.enum';

@InputType()
export class CreateFightInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  eventId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  fighter1Id: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  fighter2Id: string;

  @Field(() => WeightClass)
  @IsNotEmpty()
  weightClass: WeightClass;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rounds: number;
}
