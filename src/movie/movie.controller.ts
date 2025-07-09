import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import {
  ApiBody,
  ApiHeader,
  ApiHeaders,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMovieRequest } from './dto/create-movie.dto';
import { MovieResponse } from './dto/movie.dto';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Получить фильмо по id',
    description: 'возвращает информацию о фильме',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id abkmvf',
  })
  // @ApiQuery({
  //   name: 'year',
  //   type: 'number',
  //   description: 'фильтр по году',
  // })
  @ApiHeader({
    name: 'X-Auth-Token',
    description: 'токен авторизации',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильм найден',
    type: MovieResponse,
  })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: 'Фильм не найден',
  // })
  @ApiNotFoundResponse({
    description: 'Фильм не найден',
    example: {
      status: 404,
      massage: 'Movie not found',
      timestamp: '2025',
      path: '/movie/:id',
    },
  })
  @Get(':id')
  findById(@Param('id') id: string, @Query('year') year: number) {
    return {
      id: 1,
      name: 'sergey',
    };
  }

  @ApiOperation({ summary: 'Создать фильм' })
  @Post()
  create(@Body() dto: CreateMovieRequest) {
    return dto;
  }
}
