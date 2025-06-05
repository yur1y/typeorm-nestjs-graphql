import { InputType, Field, ID, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsNumber,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { FightResult } from '../../../shared/enums/fight-result.enum';
import { FinishType } from '../../../shared/enums/finish-type.enum';

@InputType()
export class UpdateFightResultInput {
  @Field(() => FightResult)
  @IsNotEmpty()
  result: FightResult;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  winnerId?: string;

  @Field(() => FinishType, { nullable: true })
  @IsOptional()
  finishType?: FinishType;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  finishTime?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  finishRound?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
