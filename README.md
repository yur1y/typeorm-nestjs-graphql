# MMA Ranking Fights System

## Overview

A GraphQL API built with NestJS and TypeORM for managing MMA fighters, events, fights, and rankings.

## Features

- Fighter profiles with detailed statistics
- Event management with fight cards
- Fight result tracking
- Automated ranking system
- Real-time ranking updates via GraphQL subscriptions

## Technologies

- NestJS
- TypeORM
- PostgreSQL
- GraphQL
- Docker

## Prerequisites

- Node.js (18 or higher)
- Docker and Docker Compose
- pnpm (v8 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yur1y/typeorm-nestjs-graphql.git
cd typeorm-nestjs-graphql
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the database:

```bash
docker-compose up -d postgres
```

4. Run database seeds:

```bash
pnpm seed
```

5. Start the application:

```bash
pnpm start:dev
```

The API will be available at: http://localhost:3000/api/graphql

## Architecture

### Clean Architecture

The project follows CLEAN architecture principles with clear separation of:

- Domain Layer (Entities)
- Application Layer (Services)
- Infrastructure Layer (Repositories)
- Presentation Layer (Resolvers)

### Database Schema

- Fighters: Personal information and stats
- Events: Fight event details
- Fights: Individual fight records
- Rankings: Dynamic fighter rankings
- FighterRecords: Comprehensive fight statistics

### Ranking System

Points are awarded based on fight outcomes:

- Knockout/Submission Win: 4 points
- Decision Win: 3 points
- Draw: 1 point
- Loss: 0 points

## API Examples

### Query Fighters

```graphql
query GetFighters {
  fighters {
    id
    firstName
    lastName
    record {
      wins
      losses
    }
    currentRanking {
      position
      points
    }
  }
}
```

### Get Upcoming Events

```graphql
query GetUpcomingEvents {
  events(upcoming: true) {
    name
    date
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
  }
}
```

### Subscribe to Ranking Updates

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

## Development

### Database Migrations

```bash
# Generate a migration
pnpm typeorm migration:generate -n MigrationName

# Run migrations
pnpm typeorm migration:run
```

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

### Docker Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Remove all services
docker-compose down
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT

## Contact

Project Link: https://github.com/yur1y/typeorm-nestjs-graphql
