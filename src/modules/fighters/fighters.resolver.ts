import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { FightersService } from './fighters.service';
import { Fighter } from './entities/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { WeightClass } from '../../shared/enums/weight-class.enum';
import { FighterRecord } from './entities/fighter-record.entity';
import { Ranking } from '../rankings/entities/ranking.entity';

@Resolver(() => Fighter)
export class FightersResolver {
  constructor(private readonly fightersService: FightersService) {}

  @Query(() => Fighter)
  async fighter(@Args('id', { type: () => ID }) id: string): Promise<Fighter> {
    return this.fightersService.findOne(id);
  }

  @Query(() => [Fighter])
  async fighters(
    @Args('weightClass', { type: () => WeightClass, nullable: true })
    weightClass?: WeightClass,
  ): Promise<Fighter[]> {
    return this.fightersService.findAll(weightClass);
  }

  @Query(() => [Ranking])
  async fighterRankings(
    @Args('weightClass', { type: () => WeightClass }) weightClass: WeightClass,
  ): Promise<Ranking[]> {
    return this.fightersService.getRankings(weightClass);
  }

  @Query(() => FighterRecord)
  async fighterStats(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<FighterRecord> {
    return this.fightersService.getStats(id);
  }

  @Mutation(() => Fighter)
  async createFighter(
    @Args('input') input: CreateFighterInput,
  ): Promise<Fighter> {
    return this.fightersService.create(input);
  }

  @Mutation(() => Fighter)
  async updateFighter(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateFighterInput,
  ): Promise<Fighter> {
    return this.fightersService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteFighter(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.fightersService.delete(id);
  }
}
