import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { MovieService } from '../movie/movie.service';
import { MovieEntity } from '../movie/enteties/movie.entity';
import { ActorEntity } from '../actor/entities/actor.entity';
import { MoviePosterEntity } from '../movie/enteties/poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      MovieEntity,
      ActorEntity,
      MoviePosterEntity,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService],
  exports: [TypeOrmModule],
})
export class ReviewModule {}
