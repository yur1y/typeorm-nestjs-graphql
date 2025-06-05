import { Resolver, Subscription, Args, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Ranking } from './entities/ranking.entity';
import { WeightClass } from '../../shared/enums/weight-class.enum';
import { RankingsService } from './rankings.service';
import { RankingSearchInput } from './dto/ranking-search.input';

const pubSub = new PubSub();

@Resolver(() => Ranking)
export class RankingsResolver {
  constructor(private readonly rankingsService: RankingsService) {}

  @Query(() => [Ranking])
  async rankings(
    @Args('search', { nullable: true }) search: RankingSearchInput,
  ): Promise<Ranking[]> {
    return await this.rankingsService.searchRankings(search);
  }

  @Subscription(() => [Ranking])
  rankingsUpdated(
    @Args('weightClass', { type: () => WeightClass }) weightClass: WeightClass,
  ) {
    return pubSub.asyncIterableIterator('rankingsUpdated');
  }
}
