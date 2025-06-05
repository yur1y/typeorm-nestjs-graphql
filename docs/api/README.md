# Ranking Fights System API Documentation

## GraphQL Endpoint

```
POST /api/graphql
```

### Authentication

_TBD - Add authentication details_

### Queries

### Get Fighter

```graphql
query GetFighter($id: ID!) {
  fighter(id: $id) {
    id
    firstName
    lastName
    record {
      wins
      losses
      draws
    }
    currentRanking {
      position
      points
    }
  }
}
```

### List Upcoming Events

```graphql
query GetUpcomingEvents {
  events(upcoming: true) {
    id
    name
    date
    venue
    fights {
      fighter1 {
        firstName
        lastName
      }
      fighter2 {
        firstName
        lastName
      }
    }
  }
}
```

### Search Rankings

```graphql
query SearchRankings($params: RankingSearchInput!) {
  rankings(search: $params) {
    position
    points
    fighter {
      firstName
      lastName
    }
  }
}
```

### Mutations

### Create Fight

```graphql
mutation CreateFight($input: CreateFightInput!) {
  createFight(input: $input) {
    id
    fighter1 {
      firstName
      lastName
    }
    fighter2 {
      firstName
      lastName
    }
    weightClass
    rounds
  }
}
```

### Update Fight Result

```graphql
mutation UpdateFightResult($id: ID!, $input: UpdateFightResultInput!) {
  updateFightResult(id: $id, input: $input) {
    id
    result
    winner {
      firstName
      lastName
    }
    finishType
    finishRound
  }
}
```

### Subscriptions

### Rankings Updates

```graphql
subscription OnRankingsUpdated($weightClass: WeightClass!) {
  rankingsUpdated(weightClass: $weightClass) {
    position
    fighter {
      firstName
      lastName
    }
    points
  }
}
```
