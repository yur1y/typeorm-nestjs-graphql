-- Create enums
CREATE TYPE weight_class AS ENUM (
  'FLYWEIGHT', 'FEATHERWEIGHT', 'LIGHTWEIGHT', 'WELTERWEIGHT',
  'MIDDLEWEIGHT', 'LIGHT_HEAVYWEIGHT', 'HEAVYWEIGHT'
);

CREATE TYPE fight_result AS ENUM ('WIN', 'LOSS', 'DRAW', 'NO_CONTEST');

CREATE TYPE finish_type AS ENUM (
  'KNOCKOUT', 'TECHNICAL_KNOCKOUT', 'SUBMISSION',
  'DECISION', 'DISQUALIFICATION'
);

-- Create tables
CREATE TABLE fighters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  nickname VARCHAR(255),
  date_of_birth DATE NOT NULL,
  height FLOAT NOT NULL,
  weight FLOAT NOT NULL,
  reach FLOAT,
  stance VARCHAR(50),
  weight_class weight_class NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fighter_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fighter_id UUID NOT NULL REFERENCES fighters(id) ON DELETE CASCADE,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  draws INTEGER NOT NULL DEFAULT 0,
  no_contests INTEGER NOT NULL DEFAULT 0,
  knockouts INTEGER NOT NULL DEFAULT 0,
  submissions INTEGER NOT NULL DEFAULT 0,
  UNIQUE(fighter_id)
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL,
  venue VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  fighter1_id UUID NOT NULL REFERENCES fighters(id),
  fighter2_id UUID NOT NULL REFERENCES fighters(id),
  winner_id UUID REFERENCES fighters(id),
  weight_class weight_class NOT NULL,
  rounds INTEGER NOT NULL,
  result fight_result,
  finish_type finish_type,
  finish_time INTEGER,
  finish_round INTEGER,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fighter_id UUID NOT NULL REFERENCES fighters(id),
  weight_class weight_class NOT NULL,
  position INTEGER NOT NULL,
  points FLOAT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(fighter_id, weight_class)
);

-- Create indexes
CREATE INDEX idx_fighters_weight_class ON fighters(weight_class);
CREATE INDEX idx_fights_event_id ON fights(event_id);
CREATE INDEX idx_fights_fighters ON fights(fighter1_id, fighter2_id);
CREATE INDEX idx_rankings_weight_class ON rankings(weight_class);
CREATE INDEX idx_rankings_points ON rankings(points DESC);