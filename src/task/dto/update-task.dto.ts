import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'название должно быть строкой' })
  @IsNotEmpty({ message: 'название не может быть путтым' })
  @Length(2, 40, { message: 'название должно быть от 2 до 40 символов' })
  title: string;
  @IsBoolean({ message: 'статус долже быть булевым значением' })
  isCompleted: boolean;
}
