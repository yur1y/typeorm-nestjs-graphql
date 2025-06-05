import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan } from 'typeorm';
import { Event } from './entities/event.entity';
import { Fight } from '../fights/entities/fight.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(input: CreateEventInput): Promise<Event> {
    const event = this.eventRepository.create(input);
    return this.eventRepository.save(event);
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['fights', 'fights.fighter1', 'fights.fighter2'],
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async findAll(upcoming?: boolean): Promise<Event[]> {
    if (upcoming !== undefined) {
      const now = new Date();
      const where = upcoming
        ? { date: MoreThan(now) }
        : { date: LessThan(now) };
      return this.eventRepository.find({
        where,
        order: { date: upcoming ? 'ASC' : 'DESC' },
        relations: ['fights'],
      });
    }
    return this.eventRepository.find({
      relations: ['fights'],
      order: { date: 'DESC' },
    });
  }

  async update(id: string, input: UpdateEventInput): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, input);
    return this.eventRepository.save(event);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.eventRepository.delete(id);
    return result.affected > 0;
  }

  async getFightCard(eventId: string): Promise<Fight[]> {
    const event = await this.findOne(eventId);
    return event.fights;
  }
}
