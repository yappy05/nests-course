import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly moviesService: MovieService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Post()
  create(@Body() dto: MovieDto) {
    return this.moviesService.create(dto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.moviesService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.moviesService.delete(id);
  }
}
