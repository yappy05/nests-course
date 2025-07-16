import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Nest Course API')
    .setDescription('API documentation for Nest course')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
