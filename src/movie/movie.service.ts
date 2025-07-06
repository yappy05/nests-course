import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './enteties/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from '../actor/entities/actor.entity';
import { MoviePosterEntity } from './enteties/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly posterRepository: Repository<MoviePosterEntity>,
  ) {}
  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      order: {
        createdAd: 'desc',
      },
    });
  }
  async create(dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, actorsIds, imageUrl } = dto;
    const actors = await this.actorRepository.find({
      where: {
        id: In(actorsIds),
      },
    });
    if (!actors || !actors.length)
      throw new NotFoundException('jдин или несколько актеров не найдены');
    let poster: MoviePosterEntity | null = null;
    if (imageUrl) {
      poster = this.posterRepository.create({ url: imageUrl });
      await this.posterRepository.save(poster);
    }
    const movie = this.movieRepository.create({
      title,
      poster,
      releaseYear,
      actors,
    });
    return await this.movieRepository.save(movie);
  }
  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id: id,
      },
      relations: ['actors'],
    });
    if (!movie) throw new NotFoundException('фильм не найден');
    return movie;
  }
  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);
    Object.assign(movie, dto);
    await this.movieRepository.save(movie);
    return true;
  }
  async delete(id: string): Promise<MovieEntity> {
    const movie = await this.findById(id);
    await this.movieRepository.remove(movie);
    return movie;
  }
}
