import {
  createNoteUseCaseRequest,
  createNoteUseCaseResponse,
  ICreateNoteUseCase
} from "../../../domain/use-cases/note/create-note";
import {INoteRepository} from "../../protocols/note-repository";
import {Note} from "../../../domain/entities/Note";
import {IUuidGenerate} from "../../helpers/uuid-generate";

export class CreateNoteUseCase implements  ICreateNoteUseCase{
  constructor(private noteRepository: INoteRepository, private uuidGenerate: IUuidGenerate) {
  }

  async execute(data: createNoteUseCaseRequest): Promise<createNoteUseCaseResponse> {
    const newNote = new Note()
    newNote.id = await this.uuidGenerate.execute()
    newNote.title = data.title
    newNote.description = data.description
    newNote.user_id = data.userId
    await this.noteRepository.create(newNote)
    return ({
      title: newNote.title,
      description: newNote.description,
      id: newNote.id
    })
  }
}