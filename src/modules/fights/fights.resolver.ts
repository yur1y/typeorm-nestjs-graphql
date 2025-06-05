import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { FightsService } from './fights.service';
import { Fight } from './entities/fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightResultInput } from './dto/update-fight-result.input';
import { WeightClass } from '../../shared/enums/weight-class.enum';

const pubSub = new PubSub();

@Resolver(() => Fight)
export class FightsResolver {
  constructor(private readonly fightsService: FightsService) {}

  @Query(() => Fight)
  async fight(@Args('id', { type: () => ID }) id: string): Promise<Fight> {
    return this.fightsService.findOne(id);
  }

  @Query(() => [Fight])
  async fights(
    @Args('weightClass', { type: () => WeightClass, nullable: true })
    weightClass?: WeightClass,
  ): Promise<Fight[]> {
    return this.fightsService.findAll(weightClass);
  }

  @Mutation(() => Fight)
  async createFight(@Args('input') input: CreateFightInput): Promise<Fight> {
    return this.fightsService.create(input);
  }

  @Mutation(() => Fight)
  async updateFightResult(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateFightResultInput,
  ): Promise<Fight> {
    const fight = await this.fightsService.updateResult(id, input);
    pubSub.publish('fightResultUpdated', { fightResultUpdated: fight });
    return fight;
  }

  @Mutation(() => Boolean)
  async deleteFight(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.fightsService.delete(id);
  }

  @Subscription(() => Fight, {
    filter: (payload, variables) => {
      const fight = payload.fightResultUpdated;
      return fight.id === variables.fightId;
    },
  })
  fightResultUpdated(@Args('fightId', { type: () => ID }) fightId: string) {
    return pubSub.asyncIterableIterator(['fightResultUpdated']);
  }
}
