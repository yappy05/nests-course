import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieRequest {
  @ApiProperty({
    description: 'название фильма',
    example: 'fight club',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    description: 'год релиза',
    example: 2003,
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  @Min(1899)
  releaseYear: number;
  @ApiPropertyOptional({
    description: 'ссылка на постер фильма',
    example: 'https://img.store.com/poster/2345',
    type: String,
  })
  poster?: string;
  @ApiProperty({
    description: 'айди актеров',
    example: ['2jb21', '21jbn'],
    type: [String],
  })
  @IsArray()
  actorsIds: string[];
}
