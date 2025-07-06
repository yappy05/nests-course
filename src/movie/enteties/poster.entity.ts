import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, JoinTable, ManyToMany,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as url from 'node:url';
import { MovieEntity } from './movie.entity';


@Entity({ name: 'movie_poster' })
export class MoviePosterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  url: string;
  @OneToOne(() => MovieEntity, (movie) => movie.poster)
  movie: MovieEntity;
  @CreateDateColumn({
    name: 'created_ad',
  })
  createdAd: Date;
}
