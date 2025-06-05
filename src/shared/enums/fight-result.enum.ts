import { registerEnumType } from '@nestjs/graphql';

export enum FightResult {
  WIN = 'WIN',
  LOSS = 'LOSS',
  DRAW = 'DRAW',
  NO_CONTEST = 'NO_CONTEST',
}

registerEnumType(FightResult, {
  name: 'FightResult',
  description: 'Available fight results for fighters',
});
