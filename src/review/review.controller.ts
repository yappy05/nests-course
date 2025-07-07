import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

import { CreateReviewDto } from './dto/create_review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // @Get()
  // findAll() {
  //   return this.reviewService.findAll();
  // }
  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }
}
