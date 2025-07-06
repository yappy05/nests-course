import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './enteties/movie.entity';
import { ActorEntity } from '../actor/entities/actor.entity';
import { ReviewEntity } from '../review/entities/review.entity';
import { MoviePosterEntity } from './enteties/poster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, ActorEntity, ReviewEntity, MoviePosterEntity])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
