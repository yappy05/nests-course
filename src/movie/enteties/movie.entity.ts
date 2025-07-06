import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, JoinTable, ManyToMany,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewEntity } from '../../review/entities/review.entity';
import { ActorEntity } from '../../actor/entities/actor.entity';
import { MoviePosterEntity } from './poster.entity';

export enum Genre {
  ACTION = 'action',
  COMEDY = 'comedy',
  DRAMA = 'drama',
  HORROR = 'horror',
}

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  title: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  @Column({
    type: 'int',
    unsigned: true,
  })
  releaseYear: number;
  @Column({
    name: 'release_year',
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0.0,
  })
  rating: string;
  @Column({
    name: 'is_available',
    type: 'boolean',
    default: false,
  })
  isAvailable: boolean;
  @Column({
    name: 'release_date',
    type: 'date',
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: Genre,
    default: Genre.DRAMA,
  })
  genre: Genre;
  @Column({ name: 'poster_id', type: 'uuid', nullable: true })
  posterId: string;
  @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePosterEntity | null;
  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];
  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie-actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorEntity[];
  @CreateDateColumn({
    name: 'created_ad',
  })
  createdAd: Date;
  @UpdateDateColumn({
    name: 'updated_ad',
  })
  updatedAd: Date;
}
