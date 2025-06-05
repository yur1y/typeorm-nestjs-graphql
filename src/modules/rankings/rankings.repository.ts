import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './entities/ranking.entity';
import {
  IRankingRepository,
  RankingSearchParams,
} from '../../shared/interfaces/ranking.repository.interface';
import { WeightClass } from '../../shared/enums/weight-class.enum';

@Injectable()
export class RankingRepository implements IRankingRepository {
  constructor(
    @InjectRepository(Ranking)
    private readonly repository: Repository<Ranking>,
  ) {}

  async findByWeightClass(weightClass: WeightClass): Promise<Ranking[]> {
    return this.repository.find({
      where: { weightClass },
      relations: ['fighter'],
      order: { points: 'DESC', position: 'ASC' },
    });
  }

  async findByFighter(fighterId: string): Promise<Ranking> {
    return this.repository.findOne({
      where: { fighter: { id: fighterId } },
      relations: ['fighter'],
    });
  }

  async updateRankings(rankings: Ranking[]): Promise<void> {
    await this.repository.save(rankings);
  }

  async search(params: RankingSearchParams): Promise<Ranking[]> {
    const query = this.repository
      .createQueryBuilder('ranking')
      .leftJoinAndSelect('ranking.fighter', 'fighter');

    if (params.weightClass) {
      query.andWhere('ranking.weightClass = :weightClass', {
        weightClass: params.weightClass,
      });
    }

    if (params.minPoints) {
      query.andWhere('ranking.points >= :minPoints', {
        minPoints: params.minPoints,
      });
    }

    if (params.maxPoints) {
      query.andWhere('ranking.points <= :maxPoints', {
        maxPoints: params.maxPoints,
      });
    }

    if (params.position) {
      query.andWhere('ranking.position = :position', {
        position: params.position,
      });
    }

    if (params.fromDate) {
      query.andWhere('ranking.updatedAt >= :fromDate', {
        fromDate: params.fromDate,
      });
    }

    if (params.toDate) {
      query.andWhere('ranking.updatedAt <= :toDate', {
        toDate: params.toDate,
      });
    }

    return query
      .orderBy('ranking.points', 'DESC')
      .addOrderBy('ranking.position', 'ASC')
      .getMany();
  }
}
