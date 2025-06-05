# Ranking Algorithm

## Overview
The ranking system uses a points-based algorithm to determine fighter positions within their respective weight classes.

### Points System
- Knockout/Technical Knockout Win: 4 points
- Submission Win: 4 points
- Decision Win: 3 points
- Draw: 1 point
- Loss: 0 points

### Ranking Calculation
1. Points are accumulated for each fight
2. Fighters are sorted by total points within their weight class
3. Tiebreakers:
   - Higher win percentage
   - Most recent activity
   - Head-to-head record (if applicable)

### Background Processing
Rankings are updated automatically after each fight result is recorded:
1. Fight result is saved
2. Event is emitted to trigger ranking calculation
3. Rankings are updated asynchronously
4. Subscribed clients are notified of changes

### Implementation
```typescript
// Points calculation
if (fight.result === 'WIN') {
  if (isKnockoutOrSubmission(fight.finishType)) {
    return 4;
  }
  return 3;
}
if (fight.result === 'DRAW') {
  return 1;
}
return 0;
```