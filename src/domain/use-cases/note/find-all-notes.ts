import { Note } from "../../entities/Note";

export interface IFindAllNotesUseCase {
  execute(): Promise<Note[]>
}