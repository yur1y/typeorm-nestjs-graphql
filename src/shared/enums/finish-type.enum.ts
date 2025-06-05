import { registerEnumType } from '@nestjs/graphql';

export enum FinishType {
  KNOCKOUT = 'KNOCKOUT',
  TECHNICAL_KNOCKOUT = 'TECHNICAL_KNOCKOUT',
  SUBMISSION = 'SUBMISSION',
  DECISION = 'DECISION',
  DISQUALIFICATION = 'DISQUALIFICATION',
}

registerEnumType(FinishType, {
  name: 'FinishType',
  description: 'Available finish types for fighters',
});
