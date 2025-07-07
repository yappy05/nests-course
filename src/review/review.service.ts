import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create_review.dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;
    const review = this.prismaService.review.create({
      data: {
        text,
        ratinf: rating,
        movie: {
          connect: {
            id: movieId,
          },
        },
      },
    });
    return review;
  }

  // async findAll(): Promise<ReviewEntity[]> {
  //   const reviews = this.reviewRepository.find();
  //   return reviews;
  // }
}
