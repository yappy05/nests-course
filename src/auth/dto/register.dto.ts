import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty({
    description: 'отображаемое имя',
    example: 'Jone Doe',
    maxLength: 50,
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @MaxLength(50, { message: 'имя не должно превышать 50 символов' })
  name: string;
  @ApiProperty({
    description: 'отображаемая почта',
    example: '2012@mail.ru',
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
