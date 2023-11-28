import { Note } from "../../entities/Note";

export interface FindAllNotesByUserIdUseCase {
  execute(userId: string): Promise<Note[]>
}