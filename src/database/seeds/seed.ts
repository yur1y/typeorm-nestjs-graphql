import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Fighter } from '../../modules/fighters/entities/fighter.entity';
import { FighterRecord } from '../../modules/fighters/entities/fighter-record.entity';
import { Event } from '../../modules/events/entities/event.entity';
import { Fight } from '../../modules/fights/entities/fight.entity';
import { Ranking } from '../../modules/rankings/entities/ranking.entity';
import { WeightClass } from '../../shared/enums/weight-class.enum';
import { FightResult } from '../../shared/enums/fight-result.enum';
import { FinishType } from '../../shared/enums/finish-type.enum';
import { SeedModule } from './SeedModule';

async function seed() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const dataSource = app.get(DataSource);

  try {
    // Clear existing data
    await dataSource.synchronize(true);

    // Create fighters
    const fighters = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Fighter)
      .values([
        {
          firstName: 'Jon',
          lastName: 'Jones',
          nickname: 'Bones',
          dateOfBirth: new Date('1987-07-19'),
          height: 193,
          weight: 112.5,
          reach: 215,
          stance: 'Orthodox',
          weightClass: WeightClass.HEAVYWEIGHT,
        },
        {
          firstName: 'Francis',
          lastName: 'Ngannou',
          nickname: 'The Predator',
          dateOfBirth: new Date('1986-09-05'),
          height: 193,
          weight: 117,
          reach: 211,
          stance: 'Orthodox',
          weightClass: WeightClass.HEAVYWEIGHT,
        },
        {
          firstName: 'Israel',
          lastName: 'Adesanya',
          nickname: 'The Last Stylebender',
          dateOfBirth: new Date('1989-07-22'),
          height: 193,
          weight: 84,
          reach: 203,
          stance: 'Switch',
          weightClass: WeightClass.MIDDLEWEIGHT,
        },
        {
          firstName: 'Alexander',
          lastName: 'Volkanovski',
          nickname: 'The Great',
          dateOfBirth: new Date('1988-09-29'),
          height: 168,
          weight: 66.2,
          reach: 182,
          stance: 'Orthodox',
          weightClass: WeightClass.FEATHERWEIGHT,
        },
        {
          firstName: 'Charles',
          lastName: 'Oliveira',
          nickname: 'Do Bronx',
          dateOfBirth: new Date('1989-10-17'),
          height: 178,
          weight: 70.3,
          reach: 190,
          stance: 'Orthodox',
          weightClass: WeightClass.LIGHTWEIGHT,
        },
        {
          firstName: 'Leon',
          lastName: 'Edwards',
          nickname: 'Rocky',
          dateOfBirth: new Date('1991-08-25'),
          height: 183,
          weight: 77.1,
          reach: 193,
          stance: 'Southpaw',
          weightClass: WeightClass.WELTERWEIGHT,
        },
      ])
      .execute();

    // Create fighter records
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(FighterRecord)
      .values([
        {
          fighter: { id: fighters.identifiers[0].id },
          wins: 27,
          losses: 1,
          draws: 0,
          noContests: 1,
          knockouts: 10,
          submissions: 7,
        },
        {
          fighter: { id: fighters.identifiers[1].id },
          wins: 17,
          losses: 3,
          draws: 0,
          noContests: 0,
          knockouts: 12,
          submissions: 4,
        },
        {
          fighter: { id: fighters.identifiers[2].id },
          wins: 24,
          losses: 2,
          draws: 0,
          noContests: 0,
          knockouts: 15,
          submissions: 0,
        },
        {
          fighter: { id: fighters.identifiers[3].id },
          wins: 25,
          losses: 2,
          draws: 0,
          noContests: 0,
          knockouts: 12,
          submissions: 3,
        },
        {
          fighter: { id: fighters.identifiers[4].id },
          wins: 33,
          losses: 9,
          draws: 0,
          noContests: 1,
          knockouts: 9,
          submissions: 21,
        },
        {
          fighter: { id: fighters.identifiers[5].id },
          wins: 21,
          losses: 3,
          draws: 0,
          noContests: 0,
          knockouts: 7,
          submissions: 3,
        },
      ])
      .execute();

    // Create events
    const events = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Event)
      .values([
        {
          name: 'UFC 285',
          date: new Date('2024-07-15'),
          venue: 'T-Mobile Arena',
          city: 'Las Vegas',
          country: 'USA',
        },
        {
          name: 'UFC 286',
          date: new Date('2024-08-20'),
          venue: 'Madison Square Garden',
          city: 'New York',
          country: 'USA',
        },
        {
          name: 'UFC 287',
          date: new Date('2024-09-10'),
          venue: 'O2 Arena',
          city: 'London',
          country: 'UK',
        },
        {
          name: 'UFC 288',
          date: new Date('2024-10-05'),
          venue: 'Accor Arena',
          city: 'Paris',
          country: 'France',
        },
      ])
      .execute();

    // Create fights
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Fight)
      .values([
        {
          event: { id: events.identifiers[0].id },
          fighter1: { id: fighters.identifiers[0].id },
          fighter2: { id: fighters.identifiers[1].id },
          weightClass: WeightClass.HEAVYWEIGHT,
          rounds: 5,
          result: FightResult.WIN,
          winner: { id: fighters.identifiers[0].id },
          finishType: FinishType.SUBMISSION,
          finishRound: 3,
          finishTime: 245,
          notes: 'Heavyweight Championship',
        },
        {
          event: { id: events.identifiers[1].id },
          fighter1: { id: fighters.identifiers[2].id },
          fighter2: { id: fighters.identifiers[4].id },
          weightClass: WeightClass.MIDDLEWEIGHT,
          rounds: 5,
          result: FightResult.WIN,
          winner: { id: fighters.identifiers[2].id },
          finishType: FinishType.KNOCKOUT,
          finishRound: 2,
          finishTime: 156,
          notes: 'Middleweight Championship',
        },
        {
          event: { id: events.identifiers[2].id },
          fighter1: { id: fighters.identifiers[3].id },
          fighter2: { id: fighters.identifiers[4].id },
          weightClass: WeightClass.LIGHTWEIGHT,
          rounds: 3,
          result: FightResult.DRAW,
          finishType: FinishType.DECISION,
          finishRound: 3,
          finishTime: 300,
          notes: 'Lightweight Contender Match',
        },
        {
          event: { id: events.identifiers[3].id },
          fighter1: { id: fighters.identifiers[5].id },
          fighter2: { id: fighters.identifiers[3].id },
          weightClass: WeightClass.WELTERWEIGHT,
          rounds: 5,
          result: FightResult.WIN,
          winner: { id: fighters.identifiers[5].id },
          finishType: FinishType.TECHNICAL_KNOCKOUT,
          finishRound: 4,
          finishTime: 234,
          notes: 'Welterweight Championship',
        },
      ])
      .execute();

    // Create rankings
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Ranking)
      .values([
        {
          fighter: { id: fighters.identifiers[0].id },
          weightClass: WeightClass.HEAVYWEIGHT,
          position: 1,
          points: 100,
        },
        {
          fighter: { id: fighters.identifiers[1].id },
          weightClass: WeightClass.HEAVYWEIGHT,
          position: 2,
          points: 90,
        },
        {
          fighter: { id: fighters.identifiers[2].id },
          weightClass: WeightClass.MIDDLEWEIGHT,
          position: 1,
          points: 95,
        },
        {
          fighter: { id: fighters.identifiers[3].id },
          weightClass: WeightClass.FEATHERWEIGHT,
          position: 1,
          points: 98,
        },
        {
          fighter: { id: fighters.identifiers[4].id },
          weightClass: WeightClass.LIGHTWEIGHT,
          position: 2,
          points: 88,
        },
        {
          fighter: { id: fighters.identifiers[5].id },
          weightClass: WeightClass.WELTERWEIGHT,
          position: 1,
          points: 92,
        },
      ])
      .execute();
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await app.close();
  }
}

seed()
  .then(() => {
    console.log('Database seeded successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
