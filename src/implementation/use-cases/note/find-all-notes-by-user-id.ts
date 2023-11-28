import {IFindAllNotesByUserIdUseCase} from "../../../domain/use-cases/note/find-all-notes-by-user-id";
import {INoteRepository} from "../../protocols/note-repository";
import {Note} from "../../../domain/entities/Note";

export class FindAllNotesByUserIdUseCase implements  IFindAllNotesByUserIdUseCase{
  constructor(private noteRepository: INoteRepository) {}
  async execute(userId: string): Promise<Note[]> {
    return await this.noteRepository.findAllByUserId(userId)
  }
}