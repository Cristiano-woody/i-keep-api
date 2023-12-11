import { Note } from "../../entities/Note";

export type updateNoteUseCaseRequest = Partial<Omit<Note, "id">>

export interface IUpdateNoteUseCase {
  execute(data: updateNoteUseCaseRequest, noteId: string): Promise<Note>
}