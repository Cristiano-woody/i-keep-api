import { IUpdateNoteUseCase, updateNoteUseCaseRequest } from "../../../domain/use-cases/note/update-note";
import { Note } from "../../../domain/entities/Note";
import { INoteRepository } from "../../protocols/note-repository";
import { NoteNotFoundError } from "../../../domain/errors/note-not-found-error";

export class UpdateNoteUseCase implements  IUpdateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(data: updateNoteUseCaseRequest, noteId: string): Promise<void> {
    const note = await this.noteRepository.findOneById(noteId)
    if(note == undefined) {
      throw new NoteNotFoundError()
    }
    await this.noteRepository.update(data, noteId)
  }
}