import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from '@prisma/client';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.movie.findMany({
      // where: {
      //   isAvailable: true,
      // },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, actorsIds, imageUrl } = dto;
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorsIds },
      },
    });
    if (!actors || !actors.length)
      throw new NotFoundException('jдин или несколько актеров не найдены');
    // const poster: MoviePoster | null = null;

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : {},
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
      include: {
        actors: true,
      },
    });

    return movie;
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id: id,
      },
      include: {
        actors: true,
        poster: true,
        reviews: true,
      },
    });
    if (!movie) throw new NotFoundException('фильм не найден');
    return movie;
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {
          in: dto.actorsIds,
        },
      },
    });
    await this.prismaService.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl
          ? {
              create: {
                url: dto.imageUrl,
              },
            }
          : {},
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });
    return true;
  }

  async delete(id: string): Promise<string> {
    const movie = await this.findById(id);
    await this.prismaService.movie.delete({
      where: {
        id: movie.id,
      },
    });
    return movie.id;
  }
}
