import { IsUUID } from "class-validator";

export class RemoveNoteDto {
  @IsUUID()
  id: string
}