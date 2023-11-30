import { Note } from "../../../domain/entities/Note";
import {INoteRepository} from "../../protocols/note-repository";
import {IFindAllNotesUseCase} from "../../../domain/use-cases/note/find-all-notes";

export class FindAllNotesUseCase implements  IFindAllNotesUseCase{
  constructor(private noteRepository: INoteRepository) {}

  async execute(): Promise<Note[]> {
    return await this.noteRepository.findAll()
  }
}