import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightsResolver } from './fights.resolver';
import { FightsService } from './fights.service';
import { Fight } from './entities/fight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fight])],
  providers: [FightsResolver, FightsService],
  exports: [FightsService],
})
export class FightsModule {}
