import { registerEnumType } from '@nestjs/graphql';

export enum WeightClass {
  FLYWEIGHT = 'FLYWEIGHT',
  FEATHERWEIGHT = 'FEATHERWEIGHT',
  LIGHTWEIGHT = 'LIGHTWEIGHT',
  WELTERWEIGHT = 'WELTERWEIGHT',
  MIDDLEWEIGHT = 'MIDDLEWEIGHT',
  LIGHT_HEAVYWEIGHT = 'LIGHT_HEAVYWEIGHT',
  HEAVYWEIGHT = 'HEAVYWEIGHT',
}

registerEnumType(WeightClass, {
  name: 'WeightClass',
  description: 'Available weight classes for fighters',
});
