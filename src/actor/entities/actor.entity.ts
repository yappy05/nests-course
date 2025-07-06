import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieEntity } from '../../movie/enteties/movie.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'actor' })
export class ActorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 64 })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ManyToMany(() => MovieEntity, (movie) => movie.actors)
  movies: MovieEntity[];

  @CreateDateColumn({
    name: 'created_ad',
  })
  createdAd: Date;
  @UpdateDateColumn({
    name: 'updated_ad',
  })
  updatedAd: Date;
}
