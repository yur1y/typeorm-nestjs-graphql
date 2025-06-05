import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Fight } from '../fights/entities/fight.entity';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => Event)
  async event(@Args('id', { type: () => ID }) id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Query(() => [Event])
  async events(
    @Args('upcoming', { nullable: true }) upcoming?: boolean,
  ): Promise<Event[]> {
    return this.eventsService.findAll(upcoming);
  }

  @Query(() => [Fight])
  async eventFightCard(
    @Args('eventId', { type: () => ID }) eventId: string,
  ): Promise<Fight[]> {
    return this.eventsService.getFightCard(eventId);
  }

  @Mutation(() => Event)
  async createEvent(@Args('input') input: CreateEventInput): Promise<Event> {
    return this.eventsService.create(input);
  }

  @Mutation(() => Event)
  async updateEvent(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateEventInput,
  ): Promise<Event> {
    return this.eventsService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteEvent(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.eventsService.delete(id);
  }
}
