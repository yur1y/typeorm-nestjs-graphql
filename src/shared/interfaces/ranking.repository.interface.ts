import { WeightClass } from '../enums/weight-class.enum';
import { Ranking } from '../../modules/rankings/entities/ranking.entity';

export interface IRankingRepository {
  findByWeightClass(weightClass: WeightClass): Promise<Ranking[]>;
  findByFighter(fighterId: string): Promise<Ranking>;
  updateRankings(rankings: Ranking[]): Promise<void>;
  search(params: RankingSearchParams): Promise<Ranking[]>;
}

export interface RankingSearchParams {
  weightClass?: WeightClass;
  minPoints?: number;
  maxPoints?: number;
  position?: number;
  fromDate?: Date;
  toDate?: Date;
}
