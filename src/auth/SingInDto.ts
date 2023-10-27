import { IsString, IsEmail } from 'class-validator';

export class SingInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
