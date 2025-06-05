import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsResolver } from './rankings.resolver';
import { RankingsService } from './rankings.service';
import { Ranking } from './entities/ranking.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RankingRepository } from './rankings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking]), EventEmitterModule.forRoot()],
  providers: [RankingsResolver, RankingsService, RankingRepository],
  exports: [RankingsService],
})
export class RankingsModule {}
