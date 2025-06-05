import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from './entities/fighter.entity';
import { FighterRecord } from './entities/fighter-record.entity';
import { Ranking } from '../rankings/entities/ranking.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { WeightClass } from '../../shared/enums/weight-class.enum';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
    @InjectRepository(FighterRecord)
    private recordRepository: Repository<FighterRecord>,
  ) {}

  async create(input: CreateFighterInput): Promise<Fighter> {
    const fighter = this.fighterRepository.create(input);
    await this.fighterRepository.save(fighter);

    const record = this.recordRepository.create({
      fighter,
      wins: 0,
      losses: 0,
      draws: 0,
      noContests: 0,
      knockouts: 0,
      submissions: 0,
    });
    await this.recordRepository.save(record);

    return this.fighterRepository.findOne({
      where: { id: fighter.id },
      relations: ['record'],
    });
  }

  async findOne(id: string): Promise<Fighter> {
    const fighter = await this.fighterRepository.findOne({
      where: { id },
      relations: ['record', 'fights', 'currentRanking'],
    });
    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }
    return fighter;
  }

  async findAll(weightClass?: WeightClass): Promise<Fighter[]> {
    const query = this.fighterRepository
      .createQueryBuilder('fighter')
      .leftJoinAndSelect('fighter.record', 'record')
      .leftJoinAndSelect('fighter.currentRanking', 'ranking');

    if (weightClass) {
      query.where('fighter.weightClass = :weightClass', { weightClass });
    }

    return query.getMany();
  }

  async update(id: string, input: UpdateFighterInput): Promise<Fighter> {
    const fighter = await this.findOne(id);
    Object.assign(fighter, input);
    return this.fighterRepository.save(fighter);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.fighterRepository.delete(id);
    return result.affected > 0;
  }

  async getStats(id: string): Promise<FighterRecord> {
    const record = await this.recordRepository.findOne({
      where: { fighter: { id } },
      relations: ['fighter'],
    });
    if (!record) {
      throw new NotFoundException(`Stats for fighter with ID ${id} not found`);
    }
    return record;
  }

  async getRankings(weightClass: WeightClass): Promise<Ranking[]> {
    return this.fighterRepository
      .createQueryBuilder('fighter')
      .leftJoinAndSelect('fighter.currentRanking', 'ranking')
      .where('fighter.weightClass = :weightClass', { weightClass })
      .andWhere('ranking.id IS NOT NULL')
      .orderBy('ranking.position', 'ASC')
      .getMany()
      .then((fighters) => fighters.map((f) => f.currentRanking));
  }
}
