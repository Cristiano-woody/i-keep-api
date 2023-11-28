import { Note } from "../../entities/Note";

export interface IFindAllNotesByUserIdUseCase {
  execute(userId: string): Promise<Note[]>
}