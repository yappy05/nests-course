import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(logger);
  app.useGlobalInterceptors(new ResponseInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Nest Course API')
    .setDescription('API documentation for Nest course')
    .setVersion('1.0.0')
    .setContact('TeaCoder', 'https://teacoder.ru', 'support@gmail.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule],
  });
  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
  });
  await app.listen(3000);
}

bootstrap();
