import { Note } from "../../entities/Note";

export type updateNoteUseCaseRequest = {
  title: string
  description: string
  id: string
}

export interface IUpdateNoteUseCase {
  execute(data: updateNoteUseCaseRequest): Promise<Note>
}