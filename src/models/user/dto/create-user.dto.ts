import { IsEmail, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthday: Date;

  @IsInt()
  age: number;
}
