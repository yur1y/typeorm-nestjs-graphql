import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingRepository } from './rankings.repository';
import { Fight } from '../fights/entities/fight.entity';

import { RankingPoints } from '../../shared/interfaces/ranking.domain.interface';
import { RankingSearchParams } from '../../shared/interfaces/ranking.repository.interface';
import { FinishType } from '../../shared/enums/finish-type.enum';
import { FightResult } from '../../shared/enums/fight-result.enum';

@Injectable()
export class RankingsService {
  constructor(
    private readonly rankingRepository: RankingRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  calculatePoints(fight: Fight): number {
    if (fight.result === FightResult.WIN) {
      if (
        fight.finishType === FinishType.KNOCKOUT ||
        fight.finishType === FinishType.SUBMISSION
      ) {
        return RankingPoints.KNOCKOUT_WIN;
      }
      if (fight.finishType === FinishType.DECISION) {
        return RankingPoints.DECISION_WIN;
      }
    }
    if (fight.result === FightResult.DRAW) {
      return RankingPoints.DRAW;
    }
    return RankingPoints.LOSS;
  }

  updateRankingsBackground(fight: Fight) {
    // Emit event for background processing
    this.eventEmitter.emit('fight.completed', fight);
  }

  async handleFightCompletion(fight: Fight): Promise<void> {
    const rankings = await this.rankingRepository.findByWeightClass(
      fight.weightClass,
    );
    const points = this.calculatePoints(fight);

    // Update rankings
    for (const ranking of rankings) {
      if (ranking.fighter.id === fight.winner?.id) {
        ranking.points += points;
      }
    }

    // Sort and update positions
    rankings.sort((a, b) => b.points - a.points);
    rankings.forEach((ranking, index) => {
      ranking.position = index + 1;
    });

    await this.rankingRepository.updateRankings(rankings);
  }

  async searchRankings(params: RankingSearchParams) {
    return await this.rankingRepository.search(params);
  }
}
