import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightersResolver } from './fighters.resolver';
import { FightersService } from './fighters.service';
import { Fighter } from './entities/fighter.entity';
import { FighterRecord } from './entities/fighter-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter, FighterRecord])],
  providers: [FightersResolver, FightersService],
  exports: [FightersService],
})
export class FightersModule {}
