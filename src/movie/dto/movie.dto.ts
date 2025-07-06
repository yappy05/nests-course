import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;
  @IsString()
  imageUrl: string;
  @IsArray({})
  @IsUUID(4, { each: true })
  actorsIds: string[];
}
