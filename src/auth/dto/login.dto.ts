import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    description: 'отображаемое имя',
    example: 'Jone Doe',
    maxLength: 50,
  })
  @IsString({ message: 'Email должно быть строкой' })
  @IsNotEmpty({ message: 'Email обязательно для заполнения' })
  @IsEmail({}, { message: 'не правильный формат почты' })
  email: string;
  @ApiProperty({
    description: 'пароль от аккаунта',
    example: '123456',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'Пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязательно для заполнения' })
  @MinLength(6, { message: 'пароль минимум 6 символов' })
  @MaxLength(128)
  password: string;
}
