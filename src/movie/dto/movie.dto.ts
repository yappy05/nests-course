import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MovieResponse {
  @ApiProperty({
    description: 'айди фильма',
    example: '123456',
    type: String,
  })
  id: string;
  @ApiProperty({
    description: 'название фильма',
    example: 'fight club',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
