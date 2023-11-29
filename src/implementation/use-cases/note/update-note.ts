import { IUpdateNoteUseCase, updateNoteUseCaseRequest } from "../../../domain/use-cases/note/update-note";
import { Note } from "../../../domain/entities/Note";
import { INoteRepository } from "../../protocols/note-repository";
import { NoteNotFoundError } from "../../../domain/errors/note-not-found-error";

export class UpdateNoteUseCase implements  IUpdateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  execute(data: updateNoteUseCaseRequest): Promise<Note> {
    const note = this.noteRepository.findOneById(data.id)
    if(note == undefined) {
      throw new NoteNotFoundError()
    }
    return this.noteRepository.update(data)
  }
}