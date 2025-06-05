export class RankingPoints {
  static readonly KNOCKOUT_WIN = 4;
  static readonly SUBMISSION_WIN = 4;
  static readonly DECISION_WIN = 3;
  static readonly DRAW = 1;
  static readonly LOSS = 0;
}

export interface RankingCalculation {
  fighterId: string;
  points: number;
  lastFightDate: Date;
  winPercentage: number;
}
