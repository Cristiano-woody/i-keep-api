import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  userId: string;
}
