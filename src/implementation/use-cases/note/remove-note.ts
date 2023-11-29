import { IRemoveNoteUseCase } from "../../../domain/use-cases/note/remove-note";
import { INoteRepository } from "../../protocols/note-repository";
import { NoteNotFoundError } from "../../../domain/errors/note-not-found-error";

export class RemoveNoteUseCase implements IRemoveNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(noteId: string): Promise<void> {
    const note = this.noteRepository.findOneById(noteId)
    if(note == undefined) {
      throw new NoteNotFoundError()
    }
    await this.noteRepository.remove(noteId)
  }
}