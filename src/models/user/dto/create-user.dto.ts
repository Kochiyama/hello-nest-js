import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDateString()
  birthday: Date;

  @ApiProperty()
  @IsInt()
  age: number;
}
