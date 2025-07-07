import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Actor } from '@prisma/client';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    const { name } = dto;
    const actor = this.prismaService.actor.create({
      data: {
        name,
      },
    });
    return actor;
  }
}
