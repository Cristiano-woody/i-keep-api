import { Note } from "../../entities/Note";

export type updateNoteUseCaseRequest = Partial<Note>

export interface IUpdateNoteUseCase {
  execute(data: updateNoteUseCaseRequest, noteId: string): Promise<void>
}