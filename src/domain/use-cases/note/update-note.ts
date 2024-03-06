import { Note } from "../../entities/Note";

export interface IUpdateNoteUseCase {
  execute(data: updateNoteUseCaseRequest, noteId: string): Promise<Note>
}

export type updateNoteUseCaseRequest = Partial<Omit<Note, "id">>