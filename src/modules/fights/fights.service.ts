import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './entities/fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightResultInput } from './dto/update-fight-result.input';
import { WeightClass } from '../../shared/enums/weight-class.enum';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight)
    private fightRepository: Repository<Fight>,
  ) {}

  async create(input: CreateFightInput): Promise<Fight> {
    const fight = this.fightRepository.create(input);
    return this.fightRepository.save(fight);
  }

  async findOne(id: string): Promise<Fight> {
    const fight = await this.fightRepository.findOne({
      where: { id },
      relations: ['event', 'fighter1', 'fighter2', 'winner'],
    });
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }
    return fight;
  }

  async findAll(weightClass?: WeightClass): Promise<Fight[]> {
    const query = this.fightRepository
      .createQueryBuilder('fight')
      .leftJoinAndSelect('fight.event', 'event')
      .leftJoinAndSelect('fight.fighter1', 'fighter1')
      .leftJoinAndSelect('fight.fighter2', 'fighter2')
      .leftJoinAndSelect('fight.winner', 'winner');

    if (weightClass) {
      query.where('fight.weightClass = :weightClass', { weightClass });
    }

    return query.getMany();
  }

  async updateResult(
    id: string,
    input: UpdateFightResultInput,
  ): Promise<Fight> {
    const fight = await this.findOne(id);
    Object.assign(fight, input);
    const updatedFight = await this.fightRepository.save(fight);
    pubSub.publish('fightResultUpdated', { fightResultUpdated: updatedFight });
    return updatedFight;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.fightRepository.delete(id);
    return result.affected > 0;
  }
}
