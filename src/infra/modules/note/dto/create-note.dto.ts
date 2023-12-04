import { IsString, IsUUID } from 'class-validator';
export class CreateNoteDto {

  @IsString()
  title: string
  @IsString()
  description: string
  @IsUUID()
  userId: string
}
