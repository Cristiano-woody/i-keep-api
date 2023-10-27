import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(120)
  @MinLength(3)
  name: string;

  @IsString()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
