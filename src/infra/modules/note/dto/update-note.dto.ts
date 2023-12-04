import { Note } from "../../../../domain/entities/Note";
import { IsUUID } from "class-validator";

export type UpdateNoteDtoBody = Partial<Omit<Note, "id">>

export class UpdateNoteDtoParams {
  @IsUUID()
  id:string
}