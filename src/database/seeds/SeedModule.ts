import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '../../modules/fighters/entities/fighter.entity';
import { FighterRecord } from '../../modules/fighters/entities/fighter-record.entity';
import { Event } from '../../modules/events/entities/event.entity';
import { Fight } from '../../modules/fights/entities/fight.entity';
import { Ranking } from '../../modules/rankings/entities/ranking.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'test',
      entities: [Fighter, FighterRecord, Event, Fight, Ranking],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Fighter, FighterRecord, Event, Fight, Ranking]),
  ],
})
export class SeedModule {}
