import { Note } from "../../entities/Note";

export interface FindAllNotesUseCase {
  execute(): Promise<Note>
}