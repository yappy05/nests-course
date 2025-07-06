import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StartsWith } from '../decorators/starts_with.decarator';

export enum TaskTag {
  WORK = 'work',
  HOME = 'home',
  STUDY = 'study',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @StartsWith('Task:', { message: 'не валидное название' })
  @MinLength(2)
  @MaxLength(40)
  title: string;
  @IsNotEmpty()
  @IsString({ message: 'название должно быть строкой' })
  @IsOptional()
  description: string;
  @IsOptional()
  @IsInt({ message: 'приоритет должен быть целым числом' })
  @IsPositive({ message: 'приоритет должен быть положительным числом' })
  priority: number;
  @IsOptional()
  @IsArray({ message: 'теги должны быть массивом' })
  @IsEnum(TaskTag, { each: true, message: 'каждый тег должен быть строкой' })
  tags: TaskTag[];
}
