### Get all fighters with their records

```graphql
query GetFighters {
  fighters {
    id
    firstName
    lastName
    nickname
    weightClass
    record {
      wins
      losses
      knockouts
      submissions
    }
    currentRanking {
      position
      points
    }
  }
}
```

### Get upcoming events with fight cards

```graphql
query GetUpcomingEvents {
  events(upcoming: true) {
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
      weightClass
      rounds
    }
  }
}
```

### Get rankings for heavyweight division

```graphql
query GetHeavyweightRankings {
  rankings(search: { weightClass: HEAVYWEIGHT }) {
    position
    points
    fighter {
      firstName
      lastName
      record {
        wins
        losses
      }
    }
  }
}
```

### To use the seed script:

### Make sure your database is running:

```bash
docker-compose up -d postgres
```

### Run the seed script:

```bash
pnpm seed
```

#### This will:

* Clear existing data
* Create sample fighters with data
* Add fighter records
* Create events
* Add fights to events
* Set up initial rankings
